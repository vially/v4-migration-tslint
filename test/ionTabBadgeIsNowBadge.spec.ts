import { ruleMessage, ruleName } from '../src/ionTabBadgeIsNowBadgeRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-tab badge="sdfg"></ion-tab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when tabBadge is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabBadge="sdfg"></ion-tab>
                                   ~~~~~~~~             
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

    it('should fail when tabBadge is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabBadge="sdfg">
                                   ~~~~~~~~
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
