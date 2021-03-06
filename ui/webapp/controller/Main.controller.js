sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller, MessageBox, JSONModel) {
        "use strict";
        var globalJSONModel = new JSONModel();
        var gloablObject = {
            visitDate: "",
            providerType: "",
            clinicName: "",
            invoiceNo: "",
            claimAmount: "",
            diagnosis: "",
            attachment: "",
            remarks: ""
        };
        return Controller.extend("com.nhg.ui.controller.Main", {
            onInit: function () {
                globalJSONModel.setData(gloablObject);
                this.getView().setModel(globalJSONModel, "globalJSONModel");
                this.i18nModel = this.getOwnerComponent().getModel("i18n");
            },
            handleUploadPress: function (evt) {
                gloablObject.attachment = evt.getParameters().newValue;
                globalJSONModel.setData(gloablObject);
                this.getView().setModel(globalJSONModel, "globalJSONModel");
            },
            completeEnterDetailsStep: function (evt) {
                //alert(1)
                this._oDialog = this.getReviewFragment();
                //var sSrc = evt.getSource();
                //this._oDialog.openBy(sSrc);
                this._oDialog.open();
            },
            onRadioChange1: function (evt) {
                this.getView().byId("webradionbtn2").setSelectedIndex(-1);
            },
            onRadioChange2: function (evt) {
                this.getView().byId("webradionbtn1").setSelectedIndex(-1);
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
            onSubmit: function () {
                this.getView().getModel("globalJSONModel").getData();
                MessageBox.show(this.i18nModel.getProperty("successmsg"), {
                    title: this.i18nModel.getProperty("SUCCESS"),
                    icon: MessageBox.Icon.SUCCESS
                });
            },
            cancelClaim: function () {
                this._oDialog.close();
            },
            onNext: function () {
                var a = this.getView().byId("eclaim").getProgressStep().getNextStep();
                if (a.indexOf("idPreviewDetailsStep") == -1) {
                    this.getView().byId("eclaim").setCurrentStep(a);
                }
                else {
                    this.getView().byId("eclaim").setCurrentStep(a);
                    this.getView().byId("nextbutton").setVisible(false);
                    this.getView().byId("submitbutton").setVisible(true);

                }


            }


        });
    });
