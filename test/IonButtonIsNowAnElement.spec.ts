import { ruleName } from '../src/ionButtonIsNowAnElementRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-button><ion-button>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-button-attribute is used', () => {
      let source = `
      @Component({
        template: \`
          <button ion-button></button>\`
                  ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'Ion Button is now an Element instead of an attribute.',
        source
      });
    });
  });
});
