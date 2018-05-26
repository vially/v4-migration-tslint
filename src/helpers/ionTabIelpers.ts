import * as ast from '@angular/compiler';

export function findTabAttributeMatches(
  element: ast.ElementAst,
  matchingElements: ast.AttrAst[],
  matchingAttr: string,
  error: any,
  message: string
) {
  if (element.name === 'ion-tab') {
    matchingElements.push(...element.attrs.filter(attr => attr.name === matchingAttr));
    if (matchingElements) {
      error = message;
    }
  }
  return error;
}
