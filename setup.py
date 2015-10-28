# -*- coding: utf-8 -*-
from setuptools import setup, find_packages
import os

version = '0.0.1'

setup(
    name='erp_customization',
    version=version,
    description='App to maintain custom changes',
    author='SBK',
    author_email='kolate.sambhaji@gmail.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=("frappe",),
)
