export const TEMPLATE_COMPARE_FIELDS = ['name', 'content'] as const;

export type TemplateCompareFieldsType = typeof TEMPLATE_COMPARE_FIELDS;

export const TEMPLATE_FIELD_COMPARE_FIELDS = [
  'isRequired',
  'name',
  'type',
] as const;

export type TemplateFieldCompareFieldsType =
  typeof TEMPLATE_FIELD_COMPARE_FIELDS;
