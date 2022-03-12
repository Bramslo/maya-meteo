<script lang="ts">
import { defineCustomElement } from 'vue'

const MayaMinutely = defineCustomElement({
  // normal Vue component options here
  props: {},
  emits: {},
  template: `...`,

  // defineCustomElement only: CSS to be injected into shadow root
  styles: [`/* inlined css */`]
})

// Register the custom element.
// After registration, all `<my-vue-element>` tags
// on the page will be upgraded.
customElements.define('maya-munitely', MayaMinutely)

// You can also programmatically instantiate the element:
// (can only be done after registration)
document.body.appendChild(
  new MayaMinutely({
    // initial props (optional)
  })
)
</script>