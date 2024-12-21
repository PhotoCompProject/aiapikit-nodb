export interface Category {
  id: string;
  name: string;
  sliderDefinitions: SliderDefinition[];
  outputDefinitions: OutputDefinition[];
  priceDetailFields: PriceDetailField[];
}

export interface SliderDefinition {
  name: string;
}

export interface OutputDefinition {
  name: string;
}

export interface PriceDetailField {
  name: string;
  type: 'text' | 'number' | 'boolean';
  description: string;
}

export interface ApiProvider {
  id: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  documentationUrl: string;
  logo: {
    type: 'url' | 'upload';
    value: string;
  };
  sliders: SliderValue[];
  outputs: OutputValue[];
  priceDetails: PriceDetailValue[];
  customFields?: {
    name: string;
    value: string;
    type: 'text' | 'number' | 'boolean';
  }[];
}

export interface SliderValue {
  name: string;
  minValue: number;
  maxValue: number;
  step: number;
}

export interface OutputValue {
  name: string;
  costPerUnit: number;
  monthlyCalculation: string;
  yearlyCalculation: string;
}

export interface PriceDetailValue {
  name: string;
  value: string | number | boolean;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  lastLogin: string;
  status: AdminStatus;
  createdAt: string;
  updatedAt: string;
  permissions?: AdminPermission[];
}

export type AdminRole = 'super_admin' | 'admin';

export type AdminStatus = 'active' | 'inactive' | 'suspended';

export type AdminPermission = 
  | 'manage_admins'
  | 'manage_categories'
  | 'manage_providers'
  | 'view_dashboard'
  | 'edit_settings';

export interface AdminAuditLog {
  id: string;
  adminId: string;
  action: AdminAuditAction;
  details: string;
  timestamp: string;
  ipAddress?: string;
  entityType: 'admin' | 'category' | 'api' | 'provider';
  entityId: string;
  changes?: {
    field: string;
    before: any;
    after: any;
  }[];
  metadata?: Record<string, any>;
}

export type AdminAuditAction = 
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'toggle_featured'
  | 'update_status'
  | 'update_permissions'
  | 'update_configuration';
