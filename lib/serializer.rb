module Serializer
  
  def serialize
    if self.class.to_s == 'NilClass'
      return {:none=>TRUE}
    end

    if self.class.to_s != 'Array'
      case self.class.to_s
        when 'IndexEntryDecorator'
          self.IndexEntryDecorator_serializer
        when 'SHDM::ContextIndex'
          self.ContextIndexInstance_serializer
        when 'SHDM::Context::ContextInstance'
          self.ContextInstance_serializer
        when 'NodeDecorator'
          self.NodeDecorator_serializer
        else
          self.Resource_serializer
      end
    else
      self.map{|item| item.serialize}
    end


  end
  
  def parameters_to_url()
    if self.respond_to?(:parameters)
      parameters = self.parameters
      if parameters.is_a?(Hash) && !parameters.empty?
        parameters.merge!(parameters){|i,v| v.respond_to?(:uri) ? { "resource" => v.uri } : v }
        "?#{parameters.to_query}" 
      end
    end
  end
  
  protected
    ##############################
    #### Json format example #####
    ##############################
    
    # {"http://myIndexEntryResourceUrl" : {  "name" : [{"value" :"Paul Octopus", "url" : "http://context?node=http://paul }] }
    # -|------------------------------|----|--------|--|------------------------------------------------------------------|
    #         - Resource URI               - property            - hash with value and more details of the property
    
    def get_hash_node(node)
      if node.is_a?(IndexNodeAttribute)
       { :value => "#{CGI::escape(node.index.to_s)}#{node.parameters_to_url}", :type => get_class_name(node), :url => node.respond_to?(:target_url) ? node.target_url : nil, :parameters => node.parameters_to_url }
      elsif  node.is_a?(ContextAnchorNodeAttribute)
        { :value => node.label.to_s, :type => get_class_name(node), :target_url => node.target_url, :url => node.target_url(true) }
      elsif node.is_a?(RDF::Property)
        #node.map{|property| { :value => node.to_s, :type => node.class.to_s } }
        node.to_a.map{|property| { 
          :value => property.is_a?(RDFS::Resource) ? (property.rdfs::label.empty? ? property.compact_uri : property.rdfs::label.first) : property.to_s, 
          :type => get_class_name(property), :uri => property.is_a?(RDFS::Resource) ? property.compact_uri : nil } }
        
      else
        { :value => node.label.to_s, :type => get_class_name(node), :url => node.respond_to?(:url) ? node.url : nil }
      end
    end

    def get_class_name(obj)
      if defined? obj.classes
        self.classes.map{|i| i.to_s }
      else
        [self.class.to_s]
      end
    end
    
    def IndexEntryDecorator_serializer
      uri = self.uri.to_s
      attributes_hash = self.attributes_hash
      hash_result = {
        '@uri' => uri,
        '@type' => get_class_name(self)
      }
      self.attributes_names.each{|node| hash_result[node] = [get_hash_node(attributes_hash[node])] }
      hash_result
    end
  
    def ContextIndexInstance_serializer
      {
        '@uri' => self.uri.to_s,
        '@type' => get_class_name(self),
        "@title" => self.index_title,
        "@name" => self.index_name,
        "@nodes" => self.entries.map{ |node| {
            :value => "#{node.to_s}#{node.parameters_to_url}" ,
            :label => node.rdfs::label.first,
            :type => get_class_name(node) }
        }
      }
    end
    
    def ContextInstance_serializer
      {
        '@uri' => self.uri.to_s,
        '@type' => get_class_name(self),
        '@name' => self.context_name,
        '@title' => self.context_title,
        '@resources' => self.resources.map{ |node| {:value => "#{node.to_s}#{node.parameters_to_url}" , :type => get_class_name(node)} }
      }
    end
    
    def NodeDecorator_serializer
      uri = self.uri.to_s

      hash_result = {
          '@uri' => uri,
          '@type' => self.classes.map{|i| i.to_s},
          '@label' => self.rdfs::label || [self.compact_uri],
          '@navigational' => {
            '@position' => self.node_position,
            #'@next' => self.next_node_anchor.respond_to?(:target_url) ? self.next_node_anchor.target_url(true) : nil,
            #'@previous' => self.previous_node_anchor.respond_to?(:target_url) ? self.previous_node_anchor.target_url(true) : nil,
            #'@next_uri' => self.next_node_anchor.respond_to?(:target_url) ? self.next_node_anchor.target_url : nil,
            #'@previous_uri' => self.previous_node_anchor.respond_to?(:target_url) ? self.previous_node_anchor.target_url : nil
          }
      }

      # navigational_properties 
      attributes_hash = self.attributes_hash
      self.attributes_names.each{|node| hash_result["@navigational"][node] = [get_hash_node(attributes_hash[node])] }
      
      # resource_properties
      self.direct_properties.each{|property| hash_result[property.label.to_a.empty? ? property.compact_uri : property.label.first] = get_hash_node(property) }
      hash_result
    end
    
    
    def Resource_serializer
      uri = self.uri.to_s
      hash_result = {
          '@uri' => uri,
          '@type' => get_class_name(self),
          '@label' => self.rdfs::label || [self.compact_uri],
      }

      # resource_properties
      self.direct_properties.each{|property| hash_result[property.label.to_a.empty? ? property.compact_uri : property.label.first] = get_hash_node(property) }
      hash_result
    end
end