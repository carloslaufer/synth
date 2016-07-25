class Rest2Controller < ApplicationController

#######################################################################################################################
  def index
#######################################################################################################################
    params.delete(:controller)
    params.delete(:action)

    index_id = params.delete(:id)
    if index_id.nil?
      index_id = 'http://index'
    end
    unless index_id.nil?
      index = SHDM::Index.find(index_id)

      new_params = {}
      params.each{ |i,v| new_params[i] = v.is_a?(Hash) ? RDFS::Resource.new(v["resource"]) : v }
      new_params.delete('authenticity_token')
	
	index = index.new(new_params)
      result = serialize_idx index
    else
      result = '{ERROR":"Provide an index"}'
    end

    respond_to do |format|
      format.json  { render :json => result }
      #format.text { render :text => result.inspect }
      #format.xml  { render :xml => result }
    end
  end

#######################################################################################################################
  def context
#######################################################################################################################
    params.delete(:controller)
    params.delete(:action)

    context_id = params.delete(:id)

    unless context_id.nil?
      node_id    = params.delete(:node)
      context    =  SHDM::Context.find(context_id)

      new_params = {}
      params.each{ |i,v| new_params[i] = v.is_a?(Hash) ? RDFS::Resource.new(v["resource"]) : v }
      new_params.delete('authenticity_token')

      context   = context.new(new_params)

      if node_id.nil? || node_id.blank?
        current_node = context.nodes.first
        current_node ||= NodeDecorator.new(SYNTH::empty, context)
      else
        current_node = context.nodes.select{|node| node.uri == node_id}.first
        current_node ||= NodeDecorator.new(RDFS::Resource.new(node_id), context)
      end

      result = serialize_ctx(context, current_node)
    else
      result = '{ERROR":"Provide a context"}'
    end

    respond_to do |format|
      format.json  { render :json => result }
      #format.text { render :text => result.inspect }
      #format.xml  { render :xml => result }
    end
  end

#######################################################################################################################
  def landmark
#######################################################################################################################
    params.delete(:controller)
    params.delete(:action)

    landmarks = SHDM::Landmark.all
    result = serialize_land(SHDM::Landmark.all)

    respond_to do |format|
      format.json  { render :json => result}
      #format.text { render :text => results.inspect }
    end
  end

#######################################################################################################################
  def app
#######################################################################################################################
    params.delete(:controller)
    params.delete(:action)

    res = '{'
    res += '"app_name":"' + Application.active.name.to_s + '", '
    res += '"type":"app"'
    res += '}'

    respond_to do |format|
      format.json  { render :json => res}
    end
  end

  protected
#######################################################################################################################
# SERIALIZE INDEX
#######################################################################################################################
    def serialize_idx (obj)
	res = '{'
	res += '"app_name":"' + Application.active.name.to_s + '", '
	res += '"type":"index", '
	res += '"id":"' + obj.index_name.to_s + '", '
	res += '"label":"' + obj.index_title.to_s + '", '
	res += '"parameter":['
	f1 = false
	unless obj.parameters.empty?
		for name, value in obj.parameters do
			res += ', '														if f1
			f1 = true
			res += '{"name":"' + name.to_s + '", "value":"' + ( value.is_a?(RDFS::Resource) ? (value.rdfs::label.first || value.compact_uri) : value ).to_s + '"}'	
		end
	end
	res += '], '
	res += '"content":['
      f1 = false
      for entry in obj.entries do
		attributes = entry.attributes_names.clone
		first_name = attributes.delete_at(0)
		first_attribute = entry.attributes_hash[first_name]
		res += ', '															if f1
 		f1 = true
		res += '{'

		res += '"link":['
		res += '{"label":"' + first_attribute.label.to_s + '", "value":[{"label":"' + first_attribute.label.to_s + '", "target_url":"'
		res += (first_attribute.respond_to?(:target_url)) ? sub_url((first_attribute.target_url || "#").to_s)	: ""
		res += '"}]}'

		for name in attributes do 
			attribute = entry.attributes_hash[name]
			unless (attribute.is_a?(IndexNodeAttribute) || attribute.label.is_a?(Array))         
			      res += ', {"label":"' + name.to_s + '", "value":['
				if attribute.respond_to?(:target_url)
						res += '{"label":"' + attribute.label.to_s + '", "target_url":"' + sub_url(attribute.target_url.to_s) + '"}'
					else
						res += '{"label":"' + attribute.label.to_s + '"}'
					end
				res += ']}'
			end
		end
		res += '], '

		res += '"index":['
		for name in attributes do 
			attribute = entry.attributes_hash[name]
			f3 = false
			if attribute.is_a?(IndexNodeAttribute)              
				unless attribute.value.nodes.empty?
					res += ', '												if f3
					f3 = true													
					res += '{"label":"' + name.to_s + '", "value":['
					f2 = false
					res += '{"index_label":['
					for label_idx in attribute.value.index_attributes do
						res += ', '											if f2
						f2 = true
						res += label_idx.navigation_attribute_name.first.to_s
					end
					res += '], '
					res += '"properties":['
					f2 = false
					for index_entry in attribute.value.entries do
						for name_idx, attribute_idx in index_entry.attributes_hash do
							res += ', '										if f2
							f2 = true
							res += '{"'
							res += name_idx.to_sym + '":' + '{"label":' + attribute_idx.label.to_s
							res += ', "target_url":' + sub_url(attribute_idx.target_url.to_s)	if attribute_idx.respond_to?(:target_url)
							res += '}}'
						end                     
					end
					res += '}]}'
				end
			end
		end
		res += '], '

		res += '"array":['
		for name in attributes do 
			attribute = entry.attributes_hash[name]
			f3 = false
			if attribute.label.is_a?(Array)
				res += ', '													if f3
                        f3 = true
				res += '{"label":"' + name.to_s + '", "value":['
				f2 = false
				for o in attribute.label do
					res += ', '												if f2
					f2 = true
					if attribute.respond_to?(:target_context)
					      res += '{"label":"' + o[:label] + '", "target_url":"' +  sub_url(attribute.target_context.url((o[:params] || {}), o[:target_url])) + '"}'
					else
						if attribute.label.first.is_a?(Hash)
							res += '{"label":"' + o[:label].to_s + '", "target_url":"' + sub_url(o[:target_url].to_s) + '"}'
						else
							res += '{"label":"' + attribute.label.to_s + '"}'
						end
					end
				end
				res += ']}'
			end
		end
		res += '] '

		res += '}'
	end
	res += ']}'
    end

#######################################################################################################################
# SERIALIZE CONTEXT NODE - STRUCT
#######################################################################################################################
    def serialize_ctx (context, node)
	res = '{'
	res += '"app_name":"' + Application.active.name.to_s + '", '
	res += '"type":"context_node", '
	res += '"id":"' + context.context_name.to_s + '", '
	res += '"label":"' + context.context_title.to_s + '", '
	res += '"parameter":['
	f1 = false
	unless context.parameters.empty?
		for name, value in context.parameters do
			res += ', '														if f1
			f1 = true
			res += '{"name":"' + name.to_s + '", "value":"' + ( value.is_a?(RDFS::Resource) ? (value.rdfs::label.first || value.compact_uri) : value ).to_s + '"}'	
		end
	end

	res += '], '
	res += '"content":{'

	res += '"label":"' + (node.rdfs::label.first || node.compact_uri).to_s + '", '

	res += '"navigation":{'
	res += '"previous":{"label":"' + node.previous_node_anchor.label.to_s + '", "target_url":"' + sub_url(node.previous_node_anchor.target_url.to_s) + '"}'	unless node.previous_node.nil?
	res += ", "																									unless (node.previous_node.nil? || node.next_node.nil?) 
	res += '"next":{"label":"' + node.next_node_anchor.label.to_s + '", "target_url":"' + sub_url(node.next_node_anchor.target_url.to_s) + '"} '			unless node.next_node.nil?
	res += '} ,'

	res += '"item":{'

	res += '"datatype":['
      f1 = false
	for property in node.direct_properties do
		unless property.nil? || property.first.is_a?(RDFS::Resource)
			res += ', '														if f1
			f1 = true
			res += '{"label":"'
			res += property.label.to_a.empty? ? property.compact_uri.to_s : property.label.first.to_s
			res +=  '", "value":"' + (property.to_s) + '"}'
		end
	end
	res += '], '

	res += '"computed":['
      f1 = false
	for name, attribute in node.attributes_hash do
		unless attribute.is_a?(IndexNodeAttribute)
			res += ', '														if f1
			f1 = true
			if attribute.respond_to?(:target_url)
				res += '{"label":"' + name.to_s + '", "value":{"label":"' + attribute.label.to_s + '", "target_url":"' + sub_url(attribute.target_url.to_s) + '"}}'
			else
				res += '{"label":"' + name.to_s + '", "value":{"label":"' + attribute.label.to_s + '"}}'
			end            
		end
	end
	res += '] ,'

	res += '"index":['
      f1 = false
	for name, attribute in node.attributes_hash do
		if attribute.is_a?(IndexNodeAttribute)
			res += ', '														if f1
			f1 = true
			res += '{"label":"' + name.to_s + '", "value":{ '
			f2 = false
			for label_idx in attribute.value.index_attributes do
				res += ', '													if f2
				f2 = true
				res += '"label":"' + label_idx.navigation_attribute_name.first.to_s + '", '
				break
			end

			res += '"item":['
			f2 = false
			for index_entry in attribute.value.entries do
				for name_idx, attribute_idx in index_entry.attributes_hash do
					res += ', '												if f2
					f2 = true
					if attribute_idx.respond_to?(:target_url)
						res += '{"label":"'  + attribute_idx.label.to_s + '", "target_url":"' + sub_url(attribute_idx.target_url.to_s) + '"}'
					else
						res += '{"label":"'  + attribute_idx.label.to_s + '"}'
					end
				end
			end
			res += ']'

			res += '}}'
		end
	end
	res += ']'

	res += '}}}'
    end

#######################################################################################################################
# SERIALIZE LANDMARKS
#######################################################################################################################
    def serialize_land (landmarks)
	res = '{'
	res += '"app_name":"' + Application.active.name.to_s + '", '
	res += '"type":"landmark", '
	res += '"content":['
	f1 = false
	for l in landmarks do
		res += ', '															if f1
		f1 = true
		res += '{"label":"' + l.label.to_s + '", "target_url":"' + sub_url(l.target_url.to_s) + '", "position":"' + l.landmark_position.to_s + '"}'
	end
	res += ']}'
    end

#######################################################################################################################
# SUBSTITUTE URL - EXECUTE --> REST
#######################################################################################################################
    def sub_url (p)
       res = (p != "") ? "http://" + request.host + ":3000" + p.sub("/execute/", "/rest2/") : p
    end

end