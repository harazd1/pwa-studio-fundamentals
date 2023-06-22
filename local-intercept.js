/* local-intercept.js */

// Import the Targetables manager
const { Targetables } = require("@magento/pwa-buildpack");

function localIntercept(targets) {
  // Create a bound Targetable factory
  const targetables = Targetables.using(targets);

  // Create a React component targetable linked to the productFullDetail.js file
  const ProductDetails = targetables.reactComponent(
    "@magento/venia-ui/lib/components/Main/main.js"
  );

  // Add an import statement to the productFullDetail.js file and
  // return the SingleImportStatement object
  const TagList = ProductDetails.addImport("{TagList} from 'tagList'");

  // Insert the TagList component after the product description and pass in the
  // new categoriesListData object added to the useProductFullDetails() hook
  ProductDetails.insertAfterJSX(
    "<Header />",
    `<${TagList} />`
  );

  // Create an ES Module targetable linked to the useProductFullDetail.js file
  const useProductFullDetails = targetables.esModule(
    "@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail.js"
  );

  // Wrap the useProductFullDetail hook with your extension's wrapper file
  useProductFullDetails.wrapWithFile(
    "useProductFullDetail",
    "tagList/src/targets/wrapper"
  );
}

module.exports = localIntercept;
