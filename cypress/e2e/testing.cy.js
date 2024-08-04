describe("Testing", () => {
	beforeEach(() => {
		// Visit the home page
		cy.visit("/");
	});

	context("User is a Managed User", () => {
		beforeEach(() => {
			// Mock API responses for managed user
			cy.intercept("GET", "https://api.jsonbin.io/v3/b/66a878a5e41b4d34e4190c12", { fixture: "managedUser.json" }).as("getUser");
			cy.intercept("GET", "https://api.jsonbin.io/v3/b/66a87a90ad19ca34f88ecd65", { fixture: "documents.json" }).as("getDocuments");
			cy.intercept("GET", "https://api.jsonbin.io/v3/b/66a87a3ae41b4d34e4190ccc", { fixture: "careerGoal.json" }).as("getCareerGoal");
		});

		it("should display main layout, career goal, recent documents in descending order, and logout successfully", () => {
			// Wait for API responses
			cy.wait("@getUser");
			cy.wait("@getDocuments");
			cy.wait("@getCareerGoal");

			// Check main layout elements
			cy.get(".sider").should("exist");
			cy.get(".header").should("exist");
			cy.get(".content").should("exist");

			// Ensure that the elements are present
			cy.get(".career-goal-title").should("exist");
			cy.get(".recent-documents-title").should("exist");

			// Simulate logout
			cy.get(".ant-dropdown-trigger").first().click(); // Open the dropdown
			cy.get(".ant-dropdown-menu-item").contains("Log Out").click(); // Click logout

			// Assert user is redirected to login page
			cy.url().should("include", "/login");
		});
	});

	context("User is a Personal User", () => {
		beforeEach(() => {
			// Mock API responses for personal user
			cy.intercept("GET", "https://api.jsonbin.io/v3/b/66a878a5e41b4d34e4190c12", { fixture: "personalUser.json" }).as("getUser");
			cy.intercept("GET", "https://api.jsonbin.io/v3/b/66a87a90ad19ca34f88ecd65", { fixture: "documents.json" }).as("getDocuments");
		});

		it("should display main layout, recent documents in descending order, and logout successfully", () => {
			// Wait for API responses
			cy.wait("@getUser");
			cy.wait("@getDocuments");

			// Check main layout elements
			cy.get(".sider").should("exist");
			cy.get(".header").should("exist");
			cy.get(".content").should("exist");

			// Ensure that the elements are present
			cy.get(".career-goal-title").should("not.exist");
			cy.get(".recent-documents-title").should("exist");

			// Simulate logout
			cy.get(".ant-dropdown-trigger").first().click(); // Open the dropdown
			cy.get(".ant-dropdown-menu-item").contains("Log Out").click(); // Click logout

			// Assert user is redirected to login page
			cy.url().should("include", "/login");
		});
	});
});