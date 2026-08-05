const API = import.meta.env.VITE_API;

export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getActivity(activityId) {
  try {
    const response = await fetch(API + "/activities/" + activityId);
    const result = await response.json();

    if (!response.ok) {
      throw Error(result.message);
    }

    return result;
  } catch (error) {
    throw error;
  }
}

export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();

    throw Error(result.message);
  }
}

export async function deleteActivity(token, activityId) {
  try {
    if (!token) {
      throw Error("You must be signed in to delete an activity.");
    }

    const response = await fetch(API + "/activities/" + activityId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      const result = await response.json();

      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
}
