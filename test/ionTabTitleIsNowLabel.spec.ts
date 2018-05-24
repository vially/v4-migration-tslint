import { ruleMessage, ruleName } from '../src/ionTabTitleIsNowLabelRule';
import { assertAnnotated, assertSuccess } from './testHelper';

describe(ruleName, () => {
  describe('success', () => {
    it('should work with proper style', () => {
      let source = `
          @Component({
            template: \`  <ion-tab label="sdfg"></ion-tab>  \`
          })
          class Bar {}
        `;
      assertSuccess(ruleName, source);
    });
  });

  describe('failure', () => {
    it('should fail when tabTitle is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabTitle="sdfg"></ion-tab>
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

    it('should fail when tabTitle is passed in', () => {
      let source = `
            @Component({
              template: \`<ion-tab tabTitle="sdfg">
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
