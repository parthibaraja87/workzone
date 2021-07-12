sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,MessageBox) {
		"use strict";

		return Controller.extend("com.nhg.ui.controller.Main", {
			onInit: function () {
                this.i18nModel = this.getOwnerComponent().getModel("i18n");
            },
            completeEnterDetailsStep:function(evt){
                //alert(1)
                this._oDialog = this.getReviewFragment();
                //var sSrc = evt.getSource();
                //this._oDialog.openBy(sSrc);
                this._oDialog.open();
            },

            getReviewFragment: function () {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(
					"idValueHelpFragment", "com.nhg.ui.fragment.Review",
					this
				);
                this.getView().addDependent(this._oDialog);
                //this.this._oDialog.open();
			}
			return this._oDialog;
        },
        onSubmitClaim:function(){
             this._oDialog.close();
            MessageBox.show(this.i18nModel.getProperty("successmsg"), {
							title: this.i18nModel.getProperty("SUCCESS"),
							icon: MessageBox.Icon.SUCCESS
						});
        },
        cancelClaim:function(){
            this._oDialog.close();
        }
            

		});
	});
