import { assertSuccess, assertAnnotated, assertMultipleAnnotated, assertFailures } from './testHelper';
import { Replacement, Utils } from 'tslint';
import { expect } from 'chai';
import { ruleName } from '../src/ionOptionIsNowIonSelectOptionRule';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
        @Component({
          template: \`
            <ion-select>
              <ion-select-option>Option 1</ion-select-option>
              <ion-select-option>Option 2</ion-select-option>
              <ion-select-option>Option 3</ion-select-option>
            </ion-select>
          \`
        })
        class Bar {}
      `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when ion-option is used', () => {
      let source = `
        @Component({
          template: \`
            <ion-select>
              <ion-option>Option 1</ion-option>
               ~~~~~~~~~~
              <ion-option>Option 2</ion-option>
               ^^^^^^^^^^
              <ion-option>Option 3</ion-option>
               zzzzzzzzzz
            </ion-select>
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
            msg: 'The ion-option component is now named ion-select-option.'
          },
          {
            char: '^',
            msg: 'The ion-option component is now named ion-select-option.'
          },
          {
            char: 'z',
            msg: 'The ion-option component is now named ion-select-option.'
          }
        ]
      });
    });
  });

  describe('replacements', () => {
    it('should replace ion-option with ion-select-option', () => {
      let source = `
        @Component({
          template: \`
            <ion-select>
              <ion-option>Option 1</ion-option>
              <ion-option>Option 2</ion-option>
              <ion-option>Option 3</ion-option>
            </ion-select>
          \`
        })
        class Bar {}
      `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The ion-option component is now named ion-select-option.',
          startPosition: {
            line: 4,
            character: 15
          },
          endPosition: {
            line: 4,
            character: 25
          }
        },
        {
          message: 'The ion-option component is now named ion-select-option.',
          startPosition: {
            line: 5,
            character: 15
          },
          endPosition: {
            line: 5,
            character: 25
          }
        },
        {
          message: 'The ion-option component is now named ion-select-option.',
          startPosition: {
            line: 6,
            character: 15
          },
          endPosition: {
            line: 6,
            character: 25
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-select>
              <ion-select-option>Option 1</ion-select-option>
              <ion-select-option>Option 2</ion-select-option>
              <ion-select-option>Option 3</ion-select-option>
            </ion-select>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });

    it('should replace ion-option with ion-select-option on multiline', () => {
      let source = `
        @Component({
          template: \`
            <ion-select>
              <ion-option value="f">
                Female
              </ion-option>
              <ion-option value="m">
                Male
              </ion-option>
            </ion-select>
          \`
        })
        class Bar {}
      `;

      const failures = assertFailures(ruleName, source, [
        {
          message: 'The ion-option component is now named ion-select-option.',
          startPosition: {
            line: 4,
            character: 15
          },
          endPosition: {
            line: 4,
            character: 25
          }
        },
        {
          message: 'The ion-option component is now named ion-select-option.',
          startPosition: {
            line: 7,
            character: 15
          },
          endPosition: {
            line: 7,
            character: 25
          }
        }
      ]);

      const fixes = failures.map(f => f.getFix());
      const res = Replacement.applyAll(source, Utils.flatMap(fixes, Utils.arrayify));

      let expected = `
        @Component({
          template: \`
            <ion-select>
              <ion-select-option value="f">
                Female
              </ion-select-option>
              <ion-select-option value="m">
                Male
              </ion-select-option>
            </ion-select>
          \`
        })
        class Bar {}
      `;

      expect(res).to.eq(expected);
    });
  });
});
