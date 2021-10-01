/// <reference types="cypress" />
describe("automated-seo-tests", () => {
  before(() => {
    cy.visit("http://localhost:5000");
  });

  it("Verify page title", () => {
    cy.title().should("eq", "Automated Testing for SEO | Regression");
  });

  it("Verify page description", () => {
    cy.get('meta[name="description"]').should(
      "have.attr",
      "content",
      "Testing SEO data using automation."
    );
  });

  it("Verify jsonLD structured data - simple", () => {
    // Query the script tag with type application/ld+json
    cy.get("script[type='application/ld+json']").then((scriptTag) => {
      // we need to parse the JSON LD from text to a JSON to easily test it
      const jsonLD = JSON.parse(scriptTag.text());

      // once parsed we can easily test for different data points
      expect(jsonLD["@context"]).equal("https://schema.org");
      expect(jsonLD.author).length(2);

      // Cross referencing SEO data between the page title and the headline
      // in the jsonLD data, great for dynamic data
      cy.title().then((currentPageTitle) =>
        expect(jsonLD["headline"]).equal(currentPageTitle)
      );
    });
  });
});
