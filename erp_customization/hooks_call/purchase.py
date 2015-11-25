from __future__ import unicode_literals
import frappe
import logging
import string
import datetime
import re
import json

from frappe import throw, _, msgprint
from frappe.utils import cstr, validate_email_add, cint, comma_and, getdate
from frappe.model.document import Document
from frappe.utils import get_site_path, get_hook_method, get_files_path, random_string, encode, cstr


_logger = logging.getLogger(frappe.__name__)

@frappe.whitelist(allow_guest=True)

def validate_mandatory(self):
		# validate transaction date v/s delivery date
		if self.delivery_date:
			if getdate(self.bill_date) > getdate(self.posting_date):
				frappe.throw(_("Expected Delivery Date cannot be before Sales Order Date"))


@frappe.whitelist(allow_guest=True)
def validate_bill_no(self, method):
		frappe.msgprint(_("Supplier Invoice Date cannot be after Purchase Invoice Date"))

@frappe.whitelist(allow_guest=True)
def validate_role(self, method):
		user="kolate.sambhaji@gmail.com"
		frappe.msgprint(_("In role validate function"))
		role_list = frappe.db.sql("""select name,owner,parent,idx,role from tabUserRole where parent=%s and role='Blogger'""",
				user)
		frappe.msgprint(role_list) #this will test user role blogger

@frappe.whitelist(allow_guest=True)
def task(self, method):
		doc_m = frappe.get_doc("Sales Invoice", "SINV-00001")
		doc_m.customer = "sambhaji"
		doc_m.set("customer","sambhaji");
		doc_m.save();
		frappe.msgprint(doc_m.customer)    
		frappe.msgprint(_("Supplier Invoice Date cannot be after Purchase Invoice Date"))
					
@frappe.whitelist(allow_guest=True)
def taskFromTerminal():
	print 10
	frappe.msgprint(_("bench execute {{path_to_your_method}}"))

@frappe.whitelist(allow_guest=True)

def validate_bill_no2(self, method):
		if self.bill_no:
			# validate bill no is unique
			bill_list = frappe.db.sql("""select name from `tabPurchase Invoice` where bill_no=%s and docstatus =1 and is_recurring='0'""",
				self.bill_no)
			if len(bill_list) > 0:
				items = [e[0] for e in bill_list if e[0]!=self.name]
				frappe.throw(_("Supplier Invoice Number must be unique. Current Supplier Invoice Number already exists for {0}").format(comma_and(items)))
		if self.bill_date:
				if getdate(self.bill_date) > getdate(self.posting_date):
					frappe.throw(_("Supplier Invoice Date cannot be after Purchase Invoice Date"))


