import * as generateId from 'uuid/v4';
import { Model } from './dataModel';

export const DEFAULT_USER = {
    id:  generateId(),
    name: 'Pato Beltran'
};

export const templates: Model.Template[] = [];
export const devices: Model.Device[] = [];
export const apps: Model.App[] = [];
export const viewer: Model.User = DEFAULT_USER;