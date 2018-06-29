import { ruleName } from '../src/ionButtonAttributesAreRenamedRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`<ion-button slot="start"><ion-button>\`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when icon-left is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-left></ion-button>\`
                      ~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-left attribute of ion-button has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when icon-start is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-start></ion-button>\`
                      ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-start attribute of ion-button has been renamed. Use slot="start" instead.',
        source
      });
    });

    it('should fail when icon-right is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-right></ion-button>\`
                      ~~~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-right attribute of ion-button has been renamed. Use slot="end" instead.',
        source
      });
    });

    it('should fail when icon-end is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button icon-end></ion-button>\`
                      ~~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The icon-end attribute of ion-button has been renamed. Use slot="end" instead.',
        source
      });
    });

    it('should fail when small is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button small></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The small attribute of ion-button has been renamed. Use size="small" instead.',
        source
      });
    });

    it('should fail when large is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button large></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The large attribute of ion-button has been renamed. Use size="large" instead.',
        source
      });
    });

    it('should fail when clear is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button clear></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The clear attribute of ion-button has been renamed. Use fill="clear" instead.',
        source
      });
    });

    it('should fail when outline is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button outline></ion-button>\`
                      ~~~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The outline attribute of ion-button has been renamed. Use fill="outline" instead.',
        source
      });
    });

    it('should fail when solid is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button solid></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The solid attribute of ion-button has been renamed. Use fill="solid" instead.',
        source
      });
    });

    it('should fail when full is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button full></ion-button>\`
                      ~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The full attribute of ion-button has been renamed. Use expand="full" instead.',
        source
      });
    });

    it('should fail when block is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-button block></ion-button>\`
                      ~~~~~
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The block attribute of ion-button has been renamed. Use expand="block" instead.',
        source
      });
    });
  });
});
