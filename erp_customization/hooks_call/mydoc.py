from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import throw, _, msgprint
from erpnext.project.project import Project

class mydoc(Project):
	def validate(self):
		frappe.msgprint("in project sample")
		print "original doctype in Document validate"
		frappe.errprint("original doctype in Document validate")