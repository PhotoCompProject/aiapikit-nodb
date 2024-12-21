import { create } from 'zustand';
import { Admin, AdminAuditLog, AdminAuditAction, Category } from '../types/admin';
import { ApiProvider } from '../types/api';

interface AdminStore {
  // Admins
  admins: Admin[];
  addAdmin: (admin: Admin) => void;
  updateAdmin: (id: string, admin: Admin) => void;
  deleteAdmin: (id: string) => void;
  
  // Categories
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Category) => void;
  deleteCategory: (id: string) => void;

  // API Providers
  providers: ApiProvider[];
  addProvider: (provider: ApiProvider) => void;
  updateProvider: (id: string, provider: ApiProvider) => void;
  deleteProvider: (id: string) => void;
  
  // Audit Logs
  auditLogs: AdminAuditLog[];
  addAuditLog: (params: {
    action: AdminAuditAction;
    details: string;
    adminId: string;
    entityType: 'admin' | 'category' | 'api' | 'provider';
    entityId: string;
    changes?: { 
      field: string; 
      before: any; 
      after: any;
      displayName?: string;
      type?: 'text' | 'number' | 'boolean' | 'array' | 'object';
    }[];
    metadata?: {
      name?: string;
      description?: string;
      [key: string]: any;
    };
  }) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  // Admins
  admins: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: [
        'manage_admins',
        'manage_categories',
        'manage_providers',
        'view_dashboard',
        'edit_settings'
      ]
    }
  ],

  addAdmin: (admin) => 
    set((state) => {
      const newAdmin = {
        ...admin,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.addAuditLog({
        action: 'create',
        details: `Created admin: ${admin.name}`,
        adminId: admin.id,
        entityType: 'admin',
        entityId: admin.id,
        metadata: { 
          name: admin.name, 
          email: admin.email, 
          role: admin.role,
          status: admin.status,
          permissions: admin.permissions 
        }
      });
      return { admins: [...state.admins, newAdmin] };
    }),

  updateAdmin: (id, admin) =>
    set((state) => {
      const oldAdmin = state.admins.find(a => a.id === id);
      const updatedAdmin = {
        ...admin,
        updatedAt: new Date().toISOString()
      };
      state.addAuditLog({
        action: 'update',
        details: `Updated admin: ${admin.name}`,
        adminId: id,
        entityType: 'admin',
        entityId: id,
        changes: Object.keys(admin).map(key => ({
          field: key,
          before: oldAdmin ? oldAdmin[key as keyof Admin] : undefined,
          after: admin[key as keyof Admin],
          displayName: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
          type: (() => {
            const val = admin[key as keyof Admin];
            if (Array.isArray(val)) return 'array';
            if (typeof val === 'number') return 'number';
            if (typeof val === 'boolean') return 'boolean';
            if (typeof val === 'object') return 'object';
            return 'text';
          })()
        }))
      });
      return {
        admins: state.admins.map((a) => a.id === id ? updatedAdmin : a)
      };
    }),

  deleteAdmin: (id) =>
    set((state) => {
      const admin = state.admins.find(a => a.id === id);
      if (admin) {
        state.addAuditLog({
          action: 'delete',
          details: `Deleted admin: ${admin.name}`,
          adminId: id,
          entityType: 'admin',
          entityId: id,
          metadata: { name: admin.name, email: admin.email }
        });
      }
      return {
        admins: state.admins.filter((a) => a.id !== id)
      };
    }),

  // Categories
  categories: [
    {
      id: '1',
      name: 'Text Generation',
      sliderDefinitions: [
        { name: 'Input Tokens' },
        { name: 'Output Tokens' }
      ],
      outputDefinitions: [
        { name: 'Input Cost' },
        { name: 'Output Cost' },
        { name: 'Total Cost' }
      ],
      priceDetailFields: [
        { 
          name: 'Input Token Price',
          type: 'number',
          description: 'Cost per input token'
        },
        {
          name: 'Output Token Price',
          type: 'number',
          description: 'Cost per output token'
        },
        {
          name: 'Context Length',
          type: 'number',
          description: 'Maximum context length in tokens'
        }
      ]
    }
  ],

  addCategory: (category) => 
    set((state) => {
      state.addAuditLog({
        action: 'create',
        details: `Created category: ${category.name}`,
        adminId: '1',
        entityType: 'category',
        entityId: category.id,
        metadata: { name: category.name }
      });
      return { categories: [...state.categories, category] };
    }),

  updateCategory: (id, category) =>
    set((state) => {
      const oldCategory = state.categories.find(c => c.id === id);
      state.addAuditLog({
        action: 'update',
        details: `Updated category: ${category.name}`,
        adminId: '1',
        entityType: 'category',
        entityId: id,
        changes: Object.keys(category).map(key => ({
          field: key,
          before: oldCategory ? oldCategory[key as keyof Category] : undefined,
          after: category[key as keyof Category]
        }))
      });
      return {
        categories: state.categories.map((c) => c.id === id ? category : c)
      };
    }),

  deleteCategory: (id) =>
    set((state) => {
      const category = state.categories.find(c => c.id === id);
      if (category) {
        state.addAuditLog({
          action: 'delete',
          details: `Deleted category: ${category.name}`,
          adminId: '1',
          entityType: 'category',
          entityId: id,
          metadata: { name: category.name }
        });
      }
      return {
        categories: state.categories.filter((c) => c.id !== id)
      };
    }),

  // API Providers
  providers: [
    {
      id: '1',
      name: 'GPT-4',
      provider: 'OpenAI',
      category: 'text-generation',
      description: 'Advanced language model',
      featured: false,
      pricing: 'pay-per-use',
      features: ['Advanced language understanding', '8k context window', 'Complex task solving'],
      documentationUrl: 'https://platform.openai.com/docs/models/gpt-4',
      logo: {
        type: 'url',
        value: 'https://example.com/openai-logo.png'
      },
      sliders: [
        { 
          name: 'Input Tokens',
          minValue: 0,
          maxValue: 1000000,
          step: 1000
        },
        {
          name: 'Output Tokens',
          minValue: 0,
          maxValue: 1000000,
          step: 1000
        }
      ],
      outputs: [
        {
          name: 'Input Cost',
          costPerUnit: 0.0001,
          monthlyCalculation: 'Input Tokens * 0.0001',
          yearlyCalculation: 'Input Tokens * 0.0001 * 12'
        },
        {
          name: 'Output Cost',
          costPerUnit: 0.0002,
          monthlyCalculation: 'Output Tokens * 0.0002',
          yearlyCalculation: 'Output Tokens * 0.0002 * 12'
        }
      ],
      priceDetails: [
        {
          name: 'Input Token Price',
          value: 0.0001
        },
        {
          name: 'Output Token Price',
          value: 0.0002
        },
        {
          name: 'Context Length',
          value: 8192
        }
      ],
      customFields: []
    }
  ],

  addProvider: (provider) =>
    set((state) => {
      state.addAuditLog({
        action: 'create',
        details: `Created API: ${provider.name}`,
        adminId: '1',
        entityType: 'api',
        entityId: provider.id,
        metadata: {
          name: provider.name,
          provider: provider.provider,
          category: provider.category
        }
      });
      return { providers: [...state.providers, provider] };
    }),

  updateProvider: (id, provider) =>
    set((state) => {
      const oldProvider = state.providers.find(p => p.id === id);
      state.addAuditLog({
        action: 'update',
        details: `Updated API: ${provider.name}`,
        adminId: '1',
        entityType: 'api',
        entityId: id,
        changes: Object.keys(provider).map(key => ({
          field: key,
          before: oldProvider ? oldProvider[key as keyof ApiProvider] : undefined,
          after: provider[key as keyof ApiProvider]
        }))
      });
      return {
        providers: state.providers.map((p) => p.id === id ? provider : p)
      };
    }),

  deleteProvider: (id) =>
    set((state) => {
      const provider = state.providers.find(p => p.id === id);
      if (provider) {
        state.addAuditLog({
          action: 'delete',
          details: `Deleted API: ${provider.name}`,
          adminId: '1',
          entityType: 'api',
          entityId: id,
          metadata: {
            name: provider.name,
            provider: provider.provider,
            category: provider.category
          }
        });
      }
      return {
        providers: state.providers.filter((p) => p.id !== id)
      };
    }),

  // Audit Logs
  auditLogs: [],

  addAuditLog: (params) =>
    set((state) => ({
      auditLogs: [
        {
          id: Date.now().toString(),
          adminId: params.adminId,
          action: params.action,
          details: params.details,
          timestamp: new Date().toISOString(),
          ipAddress: window.location.hostname,
          entityType: params.entityType,
          entityId: params.entityId,
          changes: params.changes,
          metadata: params.metadata
        },
        ...state.auditLogs
      ]
    }))
}));
