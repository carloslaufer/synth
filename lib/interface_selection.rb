require "interface-rules"

module InterfaceSelection

	def render_interface(facts_source)
		facts = InterfaceRules::Facts.new
		facts.convert_to_triples(facts_source)
		
		selected_interface = SWUI::Interface.select_interface(facts.triples)
		
		return selected_interface ? selected_interface.label : nil
	end
	
end