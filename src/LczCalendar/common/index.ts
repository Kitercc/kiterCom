export function getIconJson(type: any) {
  const priority = {
    first: 'lcz-com-icon-a-1diyiji',
    second: 'lcz-com-icon-a-2dierji',
    third: 'lcz-com-icon-a-3disanji',
    default: ''
  }
  return priority[type] || priority['default']
}
