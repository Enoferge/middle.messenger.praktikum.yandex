
import { DefaultLayout } from "@/layouts/default";

import { Block } from "../block/block";

export abstract class BasePageWithLayout extends Block {
  constructor(pageBlock: Block, layoutProps?: { hideHomeButton?: boolean }) {
    const layout = new DefaultLayout({
      ...layoutProps,
      children: {
        PageContent: pageBlock
      }
    })

    super('div', {
      children: {
        layout
      }
    })
  }

  render() {
    return `{{{layout}}}`
  }
}
