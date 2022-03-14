<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Letter from "../Letter.svelte";
  import ThemeContainer from "../../common/ThemeContainer.svelte";
</script>

<!-- More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export -->
<!-- More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes -->
<Meta
  title="Table/Letter"
  component={Letter}
  argTypes={{
    letter: { defaultValue: "h", control: "text" },
    show: { defaultValue: false, control: "boolean" },
    success: { defaultValue: false, control: "boolean" },
    secondary: { defaultValue: false, control: "boolean" },
    neutral: { defaultValue: false, control: "boolean" },
  }}
/>

<!-- More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args -->
<Template let:args>
  <ThemeContainer>
    <Letter {...args} />
  </ThemeContainer>
</Template>

<!-- More on args: https://storybook.js.org/docs/svelte/writing-stories/args -->
<Story name="Default" />

<Story
  name="Visible"
  args={{
    show: true,
  }}
/>
