import { ruleMessage, ruleName } from '../src/ionTabBadgeStyleIsNowBadgeStyleRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-tab badgeStyle="sdfg"></ion-tab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when tabBadgeStyle is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabBadgeStyle="sdfg"></ion-tab>
                                   ~~~~~~~~~~~~~             
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });

    it('should fail when tabBadgeStyle is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabBadgeStyle="sdfg">
                                   ~~~~~~~~~~~~~
                          </ion-tab>
              \`
            })
            class Bar {}
          `;

      assertAnnotated({
        ruleName,
        message: ruleMessage,
        source
      });
    });
  });
});
