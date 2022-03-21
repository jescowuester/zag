import { injectGlobal } from "@emotion/css"
import * as Popover from "@ui-machines/popover"
import { normalizeProps, useMachine, useSetup, PropTypes } from "@ui-machines/vue"
import { defineComponent } from "@vue/runtime-core"
import { useControls } from "../hooks/use-controls"
import { computed, h, Fragment, Teleport } from "vue"
import { popoverStyle } from "../../../../shared/style"
import { StateVisualizer } from "../components/state-visualizer"
import { popoverControls } from "../../../../shared/controls"

injectGlobal(popoverStyle)

export default defineComponent({
  name: "Popover",
  setup() {
    const controls = useControls(popoverControls)

    const [state, send] = useMachine(Popover.machine, {
      context: controls.context,
    })

    const ref = useSetup({ send, id: "1" })

    const popover = computed(() => Popover.connect<PropTypes>(state.value, send, normalizeProps))

    return () => {
      const {
        triggerProps,
        titleProps,
        descriptionProps,
        closeButtonProps,
        contentProps,
        positionerProps,
        arrowProps,
        innerArrowProps,
        portalled,
      } = popover.value

      const Wrapper = portalled ? Teleport : Fragment

      return (
        <>
          <controls.ui />

          <div class="popover" ref={ref}>
            <button data-testid="button-before">Button :before</button>

            <button class="popover__trigger" data-testid="popover-trigger" {...triggerProps}>
              Click me
            </button>

            <Wrapper to="body">
              <div class="popover__popper" {...positionerProps}>
                <div class="popover__content" data-testid="popover-content" {...contentProps}>
                  <div class="popover__arrow" {...arrowProps}>
                    <div {...innerArrowProps} />
                  </div>
                  <div class="popover__title" data-testid="popover-title" {...titleProps}>
                    Popover Title
                  </div>
                  <div class="popover__body" data-testid="popover-body" {...descriptionProps}>
                    <a>Non-focusable Link</a>
                    <a href="#" data-testid="focusable-link">
                      Focusable Link
                    </a>
                    <input data-testid="input" placeholder="input" />
                    <button class="popover__close-button" data-testid="popover-close-button" {...closeButtonProps}>
                      X
                    </button>
                  </div>
                </div>
              </div>
            </Wrapper>

            <span data-testid="plain-text">I am just text</span>
            <button data-testid="button-after">Button :after</button>
          </div>

          <StateVisualizer state={state} />
        </>
      )
    }
  },
})
