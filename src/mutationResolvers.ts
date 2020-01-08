import * as generateId from 'uuid/v4';

import { MutationResolvers } from "generated/graphql";

import { viewer, apps, templates, devices } from "./store";
import { Model } from "dataModel";

export const MutationResolver: MutationResolvers = {
    newApp: (_, { name }, __) => {
        const newApp: Model.App = {
            id: generateId(),
            name
        };

        apps.push(newApp);

        if (!viewer.apps) {
            viewer.apps = new Set<string>();
        }

        viewer.apps.add(newApp.id);

        return newApp;
    },
    newDevice: (_, { appId, device: { name, templateId } }, __) => {
        const deviceApp = apps.find(a => a.id === appId);
        if (!deviceApp) {
            throw "App doesn't exist";
        }

        if (!viewer.apps?.has(appId)){
            throw "Current user is not part of the app";
        }

        const newDevice: Model.Device = {
            id: generateId(),
            name,
            template: templateId
        };

        devices.push(newDevice);

        if (templateId) {
            const deviceTemplate = templates.find(t => t.id === templateId);

            if (!deviceTemplate) {
                throw "Template doesn't exist";
            }

            if (!deviceTemplate.devices) {
                deviceTemplate.devices = new Set<string>();
            }

            deviceTemplate.devices.add(newDevice.id)
        }

        if (!deviceApp.devices) {
            deviceApp.devices = new Set<string>();
        }

        deviceApp.devices.add(newDevice.id);

        return newDevice;
    },
    newTemplate: (_, { appId, name }, __) => {
        const templateApp = apps.find(a => a.id === appId);
        if (!templateApp) {
            throw "App doesn't exist";
        }

        if (!viewer.apps?.has(appId)){
            throw "Current user is not part of the app";
        }

        const newTemplate: Model.Template = {
            id: generateId(),
            name
        };

        templates.push(newTemplate);

        if (!templateApp.templates) {
            templateApp.templates = new Set<string>();
        }
        templateApp.templates.add(newTemplate.id);

        return newTemplate;
    },
    migrateDevice: (_, { data: { deviceId, templateId }}, __) => {
        const device = devices.find(d => d.id === deviceId);
        if (!device) {
            throw "Device doesn't exist";
        }

        const template = templates.find(t => t.id === templateId);
        if (!template) {
            throw "Template doesn't exist";
        }

        let canUpdateDevice = false;
        let canUpdateTemplate = false;
        
        for (const appId of viewer.apps) {
            const app = apps.find(a => a.id === appId);

            canUpdateDevice = canUpdateDevice || app.devices.has(deviceId);
            canUpdateTemplate = canUpdateTemplate || app.templates.has(templateId);
        }

        if (!canUpdateDevice || !canUpdateTemplate) {
            throw "Current user cannot perform this operation";
        }

        const currentDeviceTemplateId = device.template;
        if (currentDeviceTemplateId) {
            const currentTemplate = templates.find(t => t.id === currentDeviceTemplateId);

            currentTemplate.devices.delete(device.id);
        }

        device.template = templateId;
        if (!template.devices) {
            template.devices = new Set<string>();
        }
        template.devices.add(device.id);

        return device;
    }
};