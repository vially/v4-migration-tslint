import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionTabAttributesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-tab label="Schedule" icon="add"></ion-tab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when tabTitle is used', () => {
      let source = `
            @Component({
              template: \`
                <ion-tabs>
                  <ion-tab tabTitle="Schedule"></ion-tab>
                           ~~~~~~~~
                </ion-tabs>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The tabTitle attribute of ion-tab has been renamed. Use label instead.',
        source
      });
    });

    it('should fail when tabIcon is used', () => {
      let source = `
            @Component({
              template: \`
                <ion-tabs>
                  <ion-tab tabIcon="add"></ion-tab>
                           ~~~~~~~
                </ion-tabs>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The tabIcon attribute of ion-tab has been renamed. Use icon instead.',
        source
      });
    });

    it('should fail when tabBadge is used', () => {
      let source = `
            @Component({
              template: \`
                <ion-tabs>
                  <ion-tab tabBadge="2"></ion-tab>
                           ~~~~~~~~
                </ion-tabs>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The tabBadge attribute of ion-tab has been renamed. Use badge instead.',
        source
      });
    });

    it('should fail when tabBadgeStyle is used', () => {
      let source = `
            @Component({
              template: \`
                <ion-tabs>
                  <ion-tab tabBadgeStyle="any"></ion-tab>
                           ~~~~~~~~~~~~~
                </ion-tabs>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: 'The tabBadgeStyle attribute of ion-tab has been renamed. Use badgeStyle instead.',
        source
      });
    });

    it('should fail with multiple', () => {
      let source = `
            @Component({
              template: \`
                <ion-tabs>
                  <ion-tab tabTitle="Schedule" tabIcon="add"></ion-tab>
                           ~~~~~~~~            ^^^^^^^
                </ion-tabs>
              \`
            })
            class Bar {}
          `;

      assertMultipleAnnotated({
        ruleName,
        source,
        failures: [
          {
            char: '~',
            msg: 'The tabTitle attribute of ion-tab has been renamed. Use label instead.'
          },
          {
            char: '^',
            msg: 'The tabIcon attribute of ion-tab has been renamed. Use icon instead.'
          }
        ]
      });
    });
  });

  describe('replacements', () => {
    it('should replace tabTitle with label', () => {
      let source = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab tabTitle="Schedule"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The tabTitle attribute of ion-tab has been renamed. Use label instead.',
        startPosition: {
          line: 4,
          character: 23
        },
        endPosition: {
          line: 4,
          character: 31
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab label="Schedule"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace tabIcon with icon', () => {
      let source = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab tabIcon="add"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The tabIcon attribute of ion-tab has been renamed. Use icon instead.',
        startPosition: {
          line: 4,
          character: 23
        },
        endPosition: {
          line: 4,
          character: 30
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab icon="add"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace tabBadge with badge', () => {
      let source = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab tabBadge="2"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The tabBadge attribute of ion-tab has been renamed. Use badge instead.',
        startPosition: {
          line: 4,
          character: 23
        },
        endPosition: {
          line: 4,
          character: 31
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab badge="2"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace tabBadgeStyle with badgeStyle', () => {
      let source = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab tabBadgeStyle="any"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The tabBadgeStyle attribute of ion-tab has been renamed. Use badgeStyle instead.',
        startPosition: {
          line: 4,
          character: 23
        },
        endPosition: {
          line: 4,
          character: 36
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab badgeStyle="any"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace multiple', () => {
      let source = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab tabTitle="Schedule" tabIcon="add"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The tabTitle attribute of ion-tab has been renamed. Use label instead.',
          startPosition: {
            line: 4,
            character: 23
          },
          endPosition: {
            line: 4,
            character: 31
          }
        },
        {
          message: 'The tabIcon attribute of ion-tab has been renamed. Use icon instead.',
          startPosition: {
            line: 4,
            character: 43
          },
          endPosition: {
            line: 4,
            character: 50
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-tabs>
              <ion-tab label="Schedule" icon="add"></ion-tab>
            </ion-tabs>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
