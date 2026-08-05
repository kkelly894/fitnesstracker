const API = import.meta.env.VITE_API;

export async function getRoutines() {
  try {
    const response = await fetch(API + "/routines");
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function createRoutine(token, routine) {
  try {
    const response = await fetch(API + "/routines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(routine),
    });

    if (response.status >= 400) {
      const result = await response.json();

      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteRoutine(token, routineId) {
  try {
    const response = await fetch(API + "/routines/" + routineId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status >= 400) {
      const result = await response.json();

      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function addSet(token, set) {
  try {
    const response = await fetch(API + "/sets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(set),
    });

    if (response.status >= 400) {
      const result = await response.json();

      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteSet(token, setId) {
  try {
    const response = await fetch(API + "/sets/" + setId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status >= 400) {
      const result = await response.json();

      throw Error(result.message);
    }
  } catch (error) {
    throw error;
  }
}
