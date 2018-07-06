import { expect } from 'chai';
import { Replacement, Utils } from 'tslint';
import { ruleName } from '../src/ionItemOptionsAttributeValuesRenamedRule';
import { assertAnnotated, assertFailure, assertFailures, assertMultipleAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
      @Component({
        template: \`
          <ion-item-sliding>
            <ion-item>
              <ion-label>Item 1</ion-label>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option expandable>
                <ion-icon name="star"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        \`
      })
      class Bar{}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when side="left" is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-item-sliding>
            <ion-item>
              <ion-label>Item 1</ion-label>
            </ion-item>
            <ion-item-options side="left">
                              ~~~~~~~~~~~
              <ion-item-option expandable>
                <ion-icon name="star"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The side="left" attribute/value of ion-item-options should be written as side="start".',
        source
      });
    });

    it('should fail when side="right" is used', () => {
      let source = `
      @Component({
        template: \`
          <ion-item-sliding>
            <ion-item>
              <ion-label>Item 1</ion-label>
            </ion-item>
            <ion-item-options side="right">
                              ~~~~~~~~~~~~
              <ion-item-option expandable>
                <ion-icon name="star"></ion-icon>
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        \`
      })
      class Bar{}
          `;

      assertAnnotated({
        ruleName,
        message: 'The side="right" attribute/value of ion-item-options should be written as side="end".',
        source
      });
    });
  });

  describe('replacements', () => {
    it('should replace side="left" with side="start"', () => {
      let source = `
        @Component({
          template: \`
            <ion-item-sliding>
              <ion-item>
                <ion-label>Item 1</ion-label>
              </ion-item>
              <ion-item-options side="left">
                <ion-item-option expandable>
                  <ion-icon name="star"></ion-icon>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The side="left" attribute/value of ion-item-options should be written as side="start".',
        startPosition: {
          line: 7,
          character: 32
        },
        endPosition: {
          line: 7,
          character: 43
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-item-sliding>
              <ion-item>
                <ion-label>Item 1</ion-label>
              </ion-item>
              <ion-item-options side="start">
                <ion-item-option expandable>
                  <ion-icon name="star"></ion-icon>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace side="right" with side="end"', () => {
      let source = `
        @Component({
          template: \`
            <ion-item-sliding>
              <ion-item>
                <ion-label>Item 1</ion-label>
              </ion-item>
              <ion-item-options side="right">
                <ion-item-option expandable>
                  <ion-icon name="star"></ion-icon>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          \`
        })
        class Bar {}
      `;

      const fail = {
        message: 'The side="right" attribute/value of ion-item-options should be written as side="end".',
        startPosition: {
          line: 7,
          character: 32
        },
        endPosition: {
          line: 7,
          character: 44
        }
      };

      const failures = assertFailure(ruleName, source, fail);
      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-item-sliding>
              <ion-item>
                <ion-label>Item 1</ion-label>
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option expandable>
                  <ion-icon name="star"></ion-icon>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
