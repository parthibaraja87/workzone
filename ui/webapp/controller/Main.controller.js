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
            "steps": [{
                visitDate: "",
                providerType: "",
                providerName: "",
                invoiceNo: "",
                claimAmount: "",
                diagnosis: "",
                attachment: "",
                remarks: ""
            }],
            "employeeList": [{ empno: "1", name: "Denise Wang" }, { empno: "2", name: "Justin Wang" }, { empno: "3", name: "Judy Wang" }],
            "providerType": [{ pno: "1", type: "Singapore Clinics" }, { pno: "2", type: "Singapore Hospitals" }, { pno: "3", type: "Others" }],
            "providerName": [
                {
                    pno: "1",
                    pname: "AMK FAMILY CLINIC PTE LTD"
                },
                {
                    pno: "2",
                    pname: "FAMILY HEALTH MEDICAL CENTRE PTE LTD"
                },
                {
                    pno: "3",
                    pname: "TONG CLINIC & SURGERY"
                },
                {
                    pno: "4",
                    pname: "YIO CHU KANG MRT CLINIC PTE LTD"
                },
                {
                    pno: "5",
                    pname: "PLUSHEALTH MEDICAL CLINIC & SURGERY"
                },
                {
                    pno: "6",
                    pname: "LIVEWELL MEDICAL FAMILY CLINIC"
                },
                {
                    pno: "7",
                    pname: "HEALTHIFY MEDICAL FAMILY CLINIC"
                },
                {
                    pno: "8",
                    pname: "HEALTHWAY MEDICAL CLINIC (BEDOK)"
                },
                {
                    pno: "9",
                    pname: "ALLIANCE CLINIC & PARTNERS PTE LTD"
                },
                {
                    pno: "10",
                    pname: "ISLAND GROUP CLINIC BEDOK"
                }]
        };
        return Controller.extend("com.nhg.ui.controller.Main", {
            onInit: function () {
                globalJSONModel.setData(gloablObject);
                this.getView().setModel(globalJSONModel, "globalJSONModel");
                this.i18nModel = this.getOwnerComponent().getModel("i18n");
                this.radioValue = "G1";
            },
            handleUploadPress: function (evt) {
                gloablObject.steps[0].attachment = evt.getParameters().newValue;
                globalJSONModel.setData(gloablObject);
                this.getView().setModel(globalJSONModel, "globalJSONModel");
            },
            onRadioChange1: function (evt) {
                this.getView().byId("webradionbtn2").setSelectedIndex(-1);
                this.getView().byId("webradionbtn3").setSelectedIndex(-1);
                if(this.radioValue !== "G1")
                {
                this.setDiscardableProperty();
                }
                this.radioValue = "G1";
            },
            onRadioChange2: function (evt) {
                this.getView().byId("webradionbtn1").setSelectedIndex(-1);
                this.getView().byId("webradionbtn3").setSelectedIndex(-1);
                this.setDiscardableProperty();
                this.radioValue = "G2";
            },
            onRadioChange3: function (evt) {
                this.getView().byId("webradionbtn1").setSelectedIndex(-1);
                this.getView().byId("webradionbtn2").setSelectedIndex(-1);
                this.setDiscardableProperty();
                this.radioValue = "G3";
            },
            setDiscardableProperty: function () {
                if (this.getView().byId("eclaim").getProgressStep() !== this.getView().byId("secondStep")) {
                    MessageBox.warning("Are you sure you want to change the Claim type ? This will discard your progress.", {
                        actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                        onClose: function (oAction) {
                            if (oAction === MessageBox.Action.YES) {
                                this.getView().byId("eclaim").discardProgress(this.getView().byId("secondStep"));
                                this.getView().byId("nextbutton").setVisible(true);
                                this.getView().byId("submitbutton").setVisible(false);
                            } 
                        }.bind(this)
                    });
                } 
            },
            gotoSteps: function () {
                var steps = this.getView().byId("eclaim").getProgressStep().getSubsequentSteps();
                var selectedKey = this.radioValue;
                switch (selectedKey) {
                    case "G2":
                        this.getView().byId("eclaim").getProgressStep().setNextStep(steps[1]);
                        break;
                    case "G3":
                        this.getView().byId("eclaim").getProgressStep().setNextStep(steps[2]);
                        break;
                    default:
                        this.getView().byId("eclaim").getProgressStep().setNextStep(steps[0]);
                        break;
                }
            },
            onNext: function () {
                var b = this.getView().byId("eclaim").getCurrentStep();
                if (b.indexOf("secondStep") !== -1) {
                    this.gotoSteps();
                    var a = this.getView().byId("eclaim").getProgressStep().getNextStep();
                    this.getView().byId("eclaim").setCurrentStep(a);
                    if (this.radioValue !== "G1") {
                        this.getView().byId("nextbutton").setVisible(false);
                    }
                }
                else {
                    var a = this.getView().byId("eclaim").getProgressStep().getNextStep();
                    if (a.indexOf("idReviewDetailsStep") !== -1) {
                        this.getView().byId("eclaim").setCurrentStep(a);
                        this.getView().byId("nextbutton").setVisible(false);
                    }
                    else {
                        this.getView().byId("eclaim").setCurrentStep(a);
                    }

                }
            },
            onDeclare: function (evt) {
                if (evt.getParameter("selected")) {
                    this.getView().byId("submitbutton").setVisible(true);
                } else {
                    this.getView().byId("submitbutton").setVisible(false);
                }
            },
            onSubmit: function () {
                this.getView().getModel("globalJSONModel").getData();
                MessageBox.show(this.i18nModel.getProperty("successmsg"), {
                    title: this.i18nModel.getProperty("SUCCESS"),
                    icon: MessageBox.Icon.SUCCESS
                });
            }


        });
    });
