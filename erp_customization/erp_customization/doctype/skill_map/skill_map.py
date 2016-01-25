# -*- coding: utf-8 -*-
# Copyright (c) 2015, SBK and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import flt, getdate, nowdate, now_datetime
from frappe import msgprint, _
from frappe.utils import flt, getdate, nowdate
from datetime import date
import json

class SkillMap(Document):
	def update_skill_mapping_details(self, args):
		for data in args.get('data'):
			frappe.errprint(data.get('id'))
		frappe.msgprint("pair coding with rohit");
		self.set('skill_mapping_details', [])
		for data in args.get('data'):
			nl = self.append('skill_mapping_details',{})
			nl.industry = data.get('title')


@frappe.whitelist()
def update_skill_details(data):
	frappe.msgprint("hi from update_skill_details");
	frappe.msgprint(data)
		# frappe.msgprint("hi from update_skill_mapping_details"+self.customer);
		# data_list=json.loads(data)
		# print type(data)
		# frappe.msgprint(type(data))

		# dl = frappe.db.sql("""select name,customer,date_of_receipt, date_of_collection,job_card,functional_location,functional_location_code,
		# 	equipment,equipment_make,serial_number,equipment_code,
		# 	conservation_protection_system, sample_taken_from, oil_temperature, winding_temperature,
		# 	remarks from `tabSample Entry Register` where order_id='%s' %s"""%(self.order, condition),as_dict=1, debug=1)

		# self.set('sample_entry_creation_tool_details', [])

		# for d in dl:
		# 	nl = self.append('sample_entry_creation_tool_details', {})
		# 	nl.sample_id = d.name
		# 	nl.customer = d.customer
		# 	nl.job_card = d.job_card
		# 	nl.functional_location=d.functional_location
		# 	nl.functional_location_code = d.functional_location_code
		# 	nl.equipment = d.equipment
		# 	nl.equipment_make = d.equipment_make
		# 	nl.serial_number =d.serial_number
		# 	nl.equipment_code =d.equipment_code
		# 	nl.date_of_receipt = d.date_of_receipt
		# 	nl.date_of_collection = d.date_of_collection
		# 	nl.conservation_protection_system = d.conservation_protection_system
		# 	nl.sample_taken_from = d.sample_taken_from
		# 	nl.oil_temperature = d.oil_temperature
		# 	nl.winding_temperature = d.winding_temperature
		# 	nl.remarks = d.remarks

		# if not self.number_of_sample:
		# 	frappe.throw("Please enter number of sample")

		# if not self.date_of_collection:
		# 	frappe.throw("Please select Date of Collection")

		# # sample_count_allowed=frappe.db.sql("""select total_samples from `tabOrder Register` where name=%s""",(self.order),as_list=1)
		# # sample_count=frappe.db.sql("""select count(name) from `tabSample Entry Register` where order_id=%s""",(self.order),as_list=1)
		# # s_create = sample_count[0][0]+self.number_of_sample
		# # if s_create >= sample_count_allowed[0][0]:
		# # 	frappe.msgprint("limit exceed")
		# # if (sample_count_allowed[0][0] <= int(sample_count[0][0])):
		# # 	frappe.msgprint(sample_count[0][0]+self.number_of_sample)
		# # 	frappe.throw("Please increase Total Samples in Work Order "+ self.order+"<br>Currently sample collected in system: "+str(sample_count[0][0])) 

		# for i in range(self.number_of_sample):
		# 	doc_sample_entry=frappe.new_doc("Sample Entry Register")
		# 	doc_sample_entry.customer = self.customer
		# 	doc_sample_entry.order_id = self.order
		# 	doc_sample_entry.date_of_receipt = self.date_of_receipt
		# 	doc_sample_entry.technical_contact = self.technical_contact
		# 	doc_sample_entry.type = self.type
		# 	doc_sample_entry.date_of_collection = self.date_of_collection
		# 	doc_sample_entry.weather_condition_during_sampling = self.weather_condition
		# 	doc_sample_entry.drawn_by = self.drawn_by			
		# 	doc_sample_entry.save()
		# 	sample_link="<a href='desk#Form/Sample Entry Register/"+doc_sample_entry.name+"'>"+doc_sample_entry.name+" </a>"
		# 	frappe.msgprint(sample_link+"created")

		# self.number_of_sample =0
		# self.weather_condition = ""
		# self.date_of_collection =""
		# self.technical_contact = ""
		# self.type =""
		# self.drawn_by =""
