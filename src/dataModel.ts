export namespace Model {
    export interface User {
        id: string;
        name: string;
        apps?: Set<string>;
    }

    export interface App {
        id: string;
        name: string;
        devices?: Set<string>;
        templates?: Set<string>;
    }

    export interface Device {
        id: string;
        name: string;
        template?: string;
    }

    export interface Template {
        id: string;
        name: string;
        devices?: Set<string>;
    }
}