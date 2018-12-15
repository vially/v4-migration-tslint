import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleMessage, ruleName } from '../src/ionPageModuleRemovedRule';
import { assertAnnotated, assertFailures } from './testHelper';

describe(ruleName, () => {
  describe('failure', () => {
    it('should fail if importing IonicPage or IonicPageModule', () => {
      let source = `
      import { IonicPage, Foo } from '@ionic/angular';
              ~~~~~~~~~~~~~~~
        `;
      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });

    it('should fail if using @IonicPage() decorator', () => {
      let source = `
      @IonicPage({segment: 'foo'})
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      class MyPage {}
        `;
      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });

    it('should fail if calling IonicPageModule.forChild()', () => {
      let source = `
      @NgModule({
        imports: [IonicPageModule.forChild(MyPage), Foo, IonicPageModule.forChild(MyPage)]
                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      })
      class MyModule {}
        `;
      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });
  });

  describe('replacements', () => {
    it('should remove page module imports', () => {
      let source = `
      import { IonicPage, Foo } from '@ionic/angular';
      import { IonicPageModule } from 'ionic-angular';
          `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The IonicPage modules have been removed.',
          startPosition: {
            line: 1,
            character: 14
          },
          endPosition: {
            line: 1,
            character: 29
          }
        },
        {
          message: 'The IonicPage modules have been removed.',
          startPosition: {
            line: 2,
            character: 15
          },
          endPosition: {
            line: 2,
            character: 30
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
      import { Foo } from '@ionic/angular';
          `);
    });

    it('should remove @IonicPage decorators', () => {
      let source = `
      @IonicPage({segment: 'foo'})
      class MyPage {}
          `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The IonicPage modules have been removed.',
          startPosition: {
            line: 1,
            character: 6
          },
          endPosition: {
            line: 1,
            character: 34
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
      class MyPage {}
          `);
    });

    it('should remove IonicPageModule.forChild(...) calls', () => {
      let source = `
      @NgModule({
        imports: [IonicPageModule.forChild(MyPage), Foo, IonicPageModule.forChild(MyPage)]
      })
      class MyModule {}
          `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The IonicPage modules have been removed.',
          startPosition: {
            line: 2,
            character: 17
          },
          endPosition: {
            line: 2,
            character: 90
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      expect(res).to.eq(`
      @NgModule({
        imports: [Foo]
      })
      class MyModule {}
          `);
    });
  });
});
