import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionMenuToggleIsNowAnElementRule';
import { assertAnnotated, assertFailure, assertSuccess } from './testHelper';

describe.only(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-menu-toggle>
            <ion-button>
              Toggle Menu
            </ion-button>
          </ion-menu-toggle>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });

    it('should work with menu attribute', () => {
      let source = `
      @Component({
        template: \`
          <ion-menu-toggle menu="foo">
            <ion-button>
              Toggle Menu
            </ion-button>
          </ion-menu-toggle>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when menuToggle attribute is used on button', () => {
      let source = `
      @Component({
        template: \`
          <button ion-button menuToggle>Toggle Menu</button>\`
                             ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        source
      });
    });

    it('should fail when menuToggle attribute is used on anchor', () => {
      let source = `
      @Component({
        template: \`
          <a ion-button menuToggle (click)="doSomething()">Toggle Menu</a>\`
                        ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        source
      });
    });

    it('should fail when ion-button attribute is used with multiline', () => {
      let source = `
      @Component({
        template: \`
          <a
            ion-button
            menuToggle
            ~~~~~~~~~~
            (click)="doSomething()">Toggle Menu</a>\`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        source
      });
    });

    it('should fail when menuToggle attribute has a value', () => {
      let source = `
      @Component({
        template: \`
          <button ion-button menuToggle="foo">Toggle Menu</button>\`
                             ~~~~~~~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace with simple element', () => {
      let source = `
        @Component({
          template: \`
            <button menuToggle>Toggle Menu</button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        startPosition: {
          line: 3,
          character: 20
        },
        endPosition: {
          line: 3,
          character: 30
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
        @Component({
          template: \`
            <ion-menu-toggle>
<button>Toggle Menu</button>
</ion-menu-toggle>
          \`
        })
        class Bar {}
      `);
    });

    it('should replace with element and attribute', () => {
      let source = `
        @Component({
          template: \`
            <button menuToggle="foo">Toggle Menu</button>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'menuToggle is now an ion-menu-toggle element instead of an Angular directive.',
        startPosition: {
          line: 3,
          character: 20
        },
        endPosition: {
          line: 3,
          character: 36
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
        @Component({
          template: \`
            <ion-menu-toggle menu="foo">
<button>Toggle Menu</button>
</ion-menu-toggle>
          \`
        })
        class Bar {}
      `);
    });
  });
});
