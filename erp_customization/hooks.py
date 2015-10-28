# -*- coding: utf-8 -*-
from __future__ import unicode_literals

app_name = "erp_customization"
app_title = "ERP CUSTOMIZATION"
app_publisher = "SBK"
app_description = "App to maintain custom changes, custom fields, custom print format and reports separate."
app_icon = "icon-star"
app_color = "grey"
app_email = "kolate.sambhaji@gmail.com"
app_version = "0.0.1"
fixtures = ["Custom Field",
"Property Setter",
"Custom Script",
"Print Format"]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/erp_customization/css/erp_customization.css"
# app_include_js = "/assets/erp_customization/js/erp_customization.js"

# include js, css files in header of web template
# web_include_css = "/assets/erp_customization/css/erp_customization.css"
# web_include_js = "/assets/erp_customization/js/erp_customization.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "erp_customization.install.before_install"
# after_install = "erp_customization.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "erp_customization.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"erp_customization.tasks.all"
# 	],
# 	"daily": [
# 		"erp_customization.tasks.daily"
# 	],
# 	"hourly": [
# 		"erp_customization.tasks.hourly"
# 	],
# 	"weekly": [
# 		"erp_customization.tasks.weekly"
# 	]
# 	"monthly": [
# 		"erp_customization.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "erp_customization.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "erp_customization.event.get_events"
# }

