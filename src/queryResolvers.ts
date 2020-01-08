import { viewer, apps, templates, devices } from "./store";
import { QueryResolvers, UserResolvers, DeviceResolvers, TemplateResolvers, AppResolvers } from "generated/graphql";

export const QueryResolver: QueryResolvers = {
    viewer: () => viewer
}

export const UserResolver: UserResolvers = {
    apps: (user) => apps.filter(a => user.apps?.has(a.id))
}

export const DeviceResolver: DeviceResolvers = {
    template: (device) => templates.find(t => t.id === device.template)
}

export const TemplateResolver: TemplateResolvers = {
    devices: (template) => devices.filter(d => template.devices?.has(d.id))
}

export const AppResolver: AppResolvers = {
    devices: (app) => devices.filter(d => app.devices?.has(d.id)),
    templates: (app) => templates.filter(t => app.templates?.has(t.id))
}