import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/Api.ts
import { use, Api as ApiGateway } from "sst/constructs";

// stacks/Database.ts
import { RDS } from "sst/constructs";
function Database({ stack }) {
  const rds = new RDS(stack, "db", {
    engine: "postgresql11.13",
    defaultDatabaseName: "main",
    migrations: "packages/core/migrations",
    types: "packages/core/src/sql.generated.ts"
  });
  return rds;
}
__name(Database, "Database");

// stacks/Api.ts
function Api({ stack }) {
  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [use(Database)]
      }
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "packages/functions/src/graphql/graphql.handler"
        },
        pothos: {
          schema: "packages/functions/src/graphql/schema.ts",
          output: "packages/graphql/schema.graphql",
          commands: [
            "cd packages/graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm"
          ]
        }
      }
    }
  });
  stack.addOutputs({
    API: api.url
  });
  return api;
}
__name(Api, "Api");

// stacks/Web.ts
import { use as use2, StaticSite } from "sst/constructs";
function Web({ stack }) {
  const api = use2(Api);
  const site = new StaticSite(stack, "site", {
    path: "packages/web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql"
    }
  });
  stack.addOutputs({
    SITE: site.url
  });
}
__name(Web, "Web");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "masterpiece",
      region: "us-east-1"
    };
  },
  stacks(app) {
    app.stack(Database).stack(Api).stack(Web);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0FwaS50cyIsICJzdGFja3MvRGF0YWJhc2UudHMiLCAic3RhY2tzL1dlYi50cyIsICJzc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB1c2UsIFN0YWNrQ29udGV4dCwgQXBpIGFzIEFwaUdhdGV3YXkgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcbmltcG9ydCB7IERhdGFiYXNlIH0gZnJvbSBcIi4vRGF0YWJhc2UuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEFwaSh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCBhcGkgPSBuZXcgQXBpR2F0ZXdheShzdGFjaywgXCJhcGlcIiwge1xuICAgIGRlZmF1bHRzOiB7XG4gICAgICBmdW5jdGlvbjoge1xuICAgICAgICBiaW5kOiBbdXNlKERhdGFiYXNlKV0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm91dGVzOiB7XG4gICAgICBcIlBPU1QgL2dyYXBocWxcIjoge1xuICAgICAgICB0eXBlOiBcImdyYXBocWxcIixcbiAgICAgICAgZnVuY3Rpb246IHtcbiAgICAgICAgICBoYW5kbGVyOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zcmMvZ3JhcGhxbC9ncmFwaHFsLmhhbmRsZXJcIixcbiAgICAgICAgfSxcbiAgICAgICAgcG90aG9zOiB7XG4gICAgICAgICAgc2NoZW1hOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zcmMvZ3JhcGhxbC9zY2hlbWEudHNcIixcbiAgICAgICAgICBvdXRwdXQ6IFwicGFja2FnZXMvZ3JhcGhxbC9zY2hlbWEuZ3JhcGhxbFwiLFxuICAgICAgICAgIGNvbW1hbmRzOiBbXG4gICAgICAgICAgICBcImNkIHBhY2thZ2VzL2dyYXBocWwgJiYgbnB4IEBnZW5xbC9jbGkgLS1vdXRwdXQgLi9nZW5xbCAtLXNjaGVtYSAuL3NjaGVtYS5ncmFwaHFsIC0tZXNtXCIsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgc3RhY2suYWRkT3V0cHV0cyh7XG4gICAgQVBJOiBhcGkudXJsLFxuICB9KTtcblxuICByZXR1cm4gYXBpO1xufVxuIiwgImltcG9ydCB7IFJEUywgU3RhY2tDb250ZXh0IH0gZnJvbSBcInNzdC9jb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhYmFzZSh7IHN0YWNrIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCByZHMgPSBuZXcgUkRTKHN0YWNrLCBcImRiXCIsIHtcbiAgICBlbmdpbmU6IFwicG9zdGdyZXNxbDExLjEzXCIsXG4gICAgZGVmYXVsdERhdGFiYXNlTmFtZTogXCJtYWluXCIsXG4gICAgbWlncmF0aW9uczogXCJwYWNrYWdlcy9jb3JlL21pZ3JhdGlvbnNcIixcbiAgICB0eXBlczogXCJwYWNrYWdlcy9jb3JlL3NyYy9zcWwuZ2VuZXJhdGVkLnRzXCIsXG4gIH0pO1xuXG4gIHJldHVybiByZHM7XG59XG4iLCAiaW1wb3J0IHsgdXNlLCBTdGFja0NvbnRleHQsIFN0YXRpY1NpdGUgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCIuL0FwaS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gV2ViKHsgc3RhY2sgfTogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IGFwaSA9IHVzZShBcGkpO1xuXG4gIGNvbnN0IHNpdGUgPSBuZXcgU3RhdGljU2l0ZShzdGFjaywgXCJzaXRlXCIsIHtcbiAgICBwYXRoOiBcInBhY2thZ2VzL3dlYlwiLFxuICAgIGJ1aWxkQ29tbWFuZDogXCJucG0gcnVuIGJ1aWxkXCIsXG4gICAgYnVpbGRPdXRwdXQ6IFwiZGlzdFwiLFxuICAgIGVudmlyb25tZW50OiB7XG4gICAgICBWSVRFX0dSQVBIUUxfVVJMOiBhcGkudXJsICsgXCIvZ3JhcGhxbFwiLFxuICAgIH0sXG4gIH0pO1xuXG4gIHN0YWNrLmFkZE91dHB1dHMoe1xuICAgIFNJVEU6IHNpdGUudXJsLFxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBTU1RDb25maWcgfSBmcm9tIFwic3N0XCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwiLi9zdGFja3MvQXBpXCI7XG5pbXBvcnQgeyBXZWIgfSBmcm9tIFwiLi9zdGFja3MvV2ViXCI7XG5pbXBvcnQgeyBEYXRhYmFzZSB9IGZyb20gXCIuL3N0YWNrcy9EYXRhYmFzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZyhfaW5wdXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogXCJtYXN0ZXJwaWVjZVwiLFxuICAgICAgcmVnaW9uOiBcInVzLWVhc3QtMVwiLFxuICAgIH07XG4gIH0sXG4gIHN0YWNrcyhhcHApIHtcbiAgICBhcHBcbiAgICAgIC5zdGFjayhEYXRhYmFzZSlcbiAgICAgIC5zdGFjayhBcGkpXG4gICAgICAuc3RhY2soV2ViKTtcbiAgfVxufSBzYXRpc2ZpZXMgU1NUQ29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFBQSxTQUFTLEtBQW1CLE9BQU8sa0JBQWtCOzs7QUNBckQsU0FBUyxXQUF5QjtBQUUzQixTQUFTLFNBQVMsRUFBRSxNQUFNLEdBQWlCO0FBQ2hELFFBQU0sTUFBTSxJQUFJLElBQUksT0FBTyxNQUFNO0FBQUEsSUFDL0IsUUFBUTtBQUFBLElBQ1IscUJBQXFCO0FBQUEsSUFDckIsWUFBWTtBQUFBLElBQ1osT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFNBQU87QUFDVDtBQVRnQjs7O0FEQ1QsU0FBUyxJQUFJLEVBQUUsTUFBTSxHQUFpQjtBQUMzQyxRQUFNLE1BQU0sSUFBSSxXQUFXLE9BQU8sT0FBTztBQUFBLElBQ3ZDLFVBQVU7QUFBQSxNQUNSLFVBQVU7QUFBQSxRQUNSLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsUUFDZixNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDWDtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFVBQ1IsVUFBVTtBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxXQUFXO0FBQUEsSUFDZixLQUFLLElBQUk7QUFBQSxFQUNYLENBQUM7QUFFRCxTQUFPO0FBQ1Q7QUE3QmdCOzs7QUVIaEIsU0FBUyxPQUFBQSxNQUFtQixrQkFBa0I7QUFHdkMsU0FBUyxJQUFJLEVBQUUsTUFBTSxHQUFpQjtBQUMzQyxRQUFNLE1BQU1DLEtBQUksR0FBRztBQUVuQixRQUFNLE9BQU8sSUFBSSxXQUFXLE9BQU8sUUFBUTtBQUFBLElBQ3pDLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxNQUNYLGtCQUFrQixJQUFJLE1BQU07QUFBQSxJQUM5QjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sV0FBVztBQUFBLElBQ2YsTUFBTSxLQUFLO0FBQUEsRUFDYixDQUFDO0FBQ0g7QUFmZ0I7OztBQ0VoQixJQUFPLHFCQUFRO0FBQUEsRUFDYixPQUFPLFFBQVE7QUFDYixXQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU8sS0FBSztBQUNWLFFBQ0csTUFBTSxRQUFRLEVBQ2QsTUFBTSxHQUFHLEVBQ1QsTUFBTSxHQUFHO0FBQUEsRUFDZDtBQUNGOyIsCiAgIm5hbWVzIjogWyJ1c2UiLCAidXNlIl0KfQo=
