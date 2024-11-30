'use-client'

const GRAPHQL_ENDPOINT = "https://mindmap-ai-mindmapai.hypermode.app/graphql";

export async function fetchGraphQL(query: string, variables = {}, token: string) {

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response.json();
}

export const queries = {
  GENERATE_MINDMAP: `
    query GenerateMindmap($userAsk: String!) {
      generateMindmap(userAsk: $userAsk) {
        content
      }
    }
  `,
  GET_MY_MINDMAPS: `
    query GetMyMindmaps {
      myMindmaps {
        id
        content
        created_at
        clerk_user_id
      }
    }
  `,
  GET_MINDMAP_SETTINGS: `
    query GetMindmapSettings {
      mindmapSettings {
        setting1
        setting2
      }
    }
  `,
  UPDATE_MINDMAP_SETTINGS: `
    mutation UpdateMindmapSettings($settings: MindmapSettingsInput!) {
      updateMindmapSettings(settings: $settings) {
        success
        message
      }
    }
  `,
}; 