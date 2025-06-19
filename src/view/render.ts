// import { DefaultLayout } from '@/layouts/default';
// import { pages } from '@/navigation/router-old';
// import type { PageName } from '@/navigation/types';

// export function renderPage(page: PageName) {
//   const { pageBlock, layoutContext = {} } = pages[page];
//   const layout = new DefaultLayout({
//     hideHomeButton: layoutContext.hideHomeButton,
//     children: {
//       PageContent: pageBlock,
//     },
//   });

//   const root = document.getElementById('app');
//   const layoutContent = layout.getContent();

//   if (root && layoutContent) {
//     root.appendChild(layoutContent);
//     pageBlock.dispatchComponentDidMount();
//   }
// }
