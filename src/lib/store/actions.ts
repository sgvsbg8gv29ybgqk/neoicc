// import { toast } from 'svelte-sonner';
import { get } from 'svelte/store'; 
import { app } from './store.svelte';
import type { App, Backpack, Object, PointType, Requireds, Row } from './types';
import { pi } from './utils';
import { backgroundImages } from '../cyoa/style/backgroundImageUtils';
import { playMusic, stopMusic, currentTrack } from './musicPlayer';

function toast(message: string) {
	console.log(message);
}

// Used everywhere in the application,
export function checkRequireds(object: { requireds?: Requireds[] }) {
	if (typeof object.requireds === 'undefined') return true;
	// If the object has requireds that have yet to be selected.
	// Needs to run trough all the requireds
	for (const required of object.requireds) {
		// Used to see if any of the requirements
		let requiredHasRequireds = false;
		// Checks if the requirement itself has requirements.
		if (typeof required.requireds !== 'undefined') {
			if (checkRequireds(required)) requiredHasRequireds = true;
		} else {
			requiredHasRequireds = true;
		}

		if (requiredHasRequireds) {
			// This happens when the object is of the type that will set HAS-requirement
			if (required.required) {
				// Is NOT in the array, is of type 'id'.
				if (!app.activated.includes(required.reqId) && required.type === 'id') {
					return false;
					// If the type of required is'Points'
				} else if (required.type === 'points') {
					if (typeof required.operator === 'undefined') {
						// Needs to run trough all the requireds
						for (const pointType of app.pointTypes) {
							// Is in the array and is of requiredf type 'points'.
							if (required.reqId === pointType.id) {
								// If there is more points than the
								if (pi(required.reqPoints) > pi(pointType.startingSum)) return false;
							}
						}
					} else {
						// Needs to run trough all the requireds
						for (const pointType of app.pointTypes) {
							// Is in the array and is of requiredf type 'points'.
							if (required.reqId === pointType.id) {
								// If reqPoints is a number and not a string
								if (!isNaN(pi(required.reqPoints))) {
									// Is there more points than required?
									if (
										pi(required.operator) === 1 &&
										pi(required.reqPoints) >= pi(pointType.startingSum)
									) {
										return false;
										// Is there more or equal points to required?
									} else if (
										pi(required.operator) === 2 &&
										pi(required.reqPoints) > pi(pointType.startingSum)
									) {
										return false;
										// Is there THIS many points?
									} else if (
										pi(required.operator) === 3 &&
										pi(required.reqPoints) !== pi(pointType.startingSum)
									) {
										return false;
										// Is there less or equal points to required?
									} else if (
										pi(required.operator) === 4 &&
										pi(required.reqPoints) < pi(pointType.startingSum)
									) {
										return false;
										// Is there less points than required?
									} else if (
										pi(required.operator) === 5 &&
										pi(required.reqPoints) <= pi(pointType.startingSum)
									) {
										return false;
									}
								} else {
									for (const pointType2 of app.pointTypes) {
										if (required.startingSum === pointType2.id) {
											// Is there more points than required?
											if (
												pi(required.operator) === 1 &&
												pi(pointType.startingSum) >= pi(pointType2.startingSum)
											) {
												return false;
												// Is there more or equal points to required?
											} else if (
												pi(required.operator) === 2 &&
												pi(pointType.startingSum) > pi(pointType2.startingSum)
											) {
												return false;
												// Is there THIS many points?
											} else if (
												pi(required.operator) === 3 &&
												pi(pointType.startingSum) !== pi(pointType2.startingSum)
											) {
												return false;
												// Is there less or equal points to required?
											} else if (
												pi(required.operator) === 4 &&
												pi(pointType.startingSum) < pi(pointType2.startingSum)
											) {
												return false;
												// Is there less points than required?
											} else if (
												pi(required.operator) === 5 &&
												pi(pointType.startingSum) <= pi(pointType2.startingSum)
											) {
												return false;
											}
										}
									}
								}
							}
						}
					}
				} else if (required.type === 'or') {
					let check = 0;

					for (const orRequired of required.orRequired) {
						if (app.activated.includes(orRequired.req) && orRequired.req != '') check++;
					}
					// Checks if one of the requireds is selected.
					if (check < (required.orNum ?? 1)) return false;
				} else if (required.type === 'pointCompare') {
					let pointtypeA: number = 0;
					let pointtypeB: number = 0;

					for (const pointType of app.pointTypes) {
						// Is in the array and is of requiredf type 'points'.
						if (required.reqId === pointType.id) {
							// If there is more points than the
							pointtypeA = pi(pointType.startingSum);
						}
					}

					for (const pointType of app.pointTypes) {
						// Is in the array and is of requiredf type 'points'.
						if (required.reqId1 === pointType.id) {
							// If there is more points than the
							pointtypeB = pi(pointType.startingSum);
						}
					}

					if (pointtypeA <= pointtypeB && pi(required.operator) === 1) return false;
					else if (pointtypeA != pointtypeB && pi(required.operator) === 2) return false;
					else if (pointtypeA < pointtypeB && pi(required.operator) === 3) return false;

					// Checks if one of the requireds is selected.
				}
			}
			// This happens when the object is of the type that will set NOT-requirement
			if (!required.required) {
				// Is in the array, is of type 'id'.
				if (app.activated.includes(required.reqId) && required.type === 'id') {
					return false;
					// If the type of reqyired is'Points'
				} else if (required.type === 'points') {
					if (typeof required.operator === 'undefined') {
						// Needs to run trough all the requireds
						for (const pointType of app.pointTypes) {
							// Is in the array and is of requiredf type 'points'.
							if (required.reqId === pointType.id) {
								// If there is more points than the
								if (pi(required.reqPoints) <= pi(pointType.startingSum)) return false;
							}
						}
					} else {
						// Needs to run trough all the requireds
						for (const pointType of app.pointTypes) {
							// Is in the array and is of requiredf type 'points'.
							if (required.reqId === pointType.id) {
								// If reqPoints is a number and not a string.
								if (!isNaN(pi(required.reqPoints))) {
									// Is there more points than required?
									if (
										pi(required.operator) === 1 &&
										pi(required.reqPoints) >= pi(pointType.startingSum)
									) {
										return false;
										// Is there more or equal points to required?
									} else if (
										pi(required.operator) === 2 &&
										pi(required.reqPoints) > pi(pointType.startingSum)
									) {
										return false;
										// Is there THIS many points?
									} else if (
										pi(required.operator) === 3 &&
										pi(required.reqPoints) !== pi(pointType.startingSum)
									) {
										return false;
										// Is there less or equal points to required?
									} else if (
										pi(required.operator) === 4 &&
										pi(required.reqPoints) < pi(pointType.startingSum)
									) {
										return false;
										// Is there less points than required?
									} else if (
										pi(required.operator) === 5 &&
										pi(required.reqPoints) <= pi(pointType.startingSum)
									) {
										return false;
									}
								} else {
									for (const pointType2 of app.pointTypes) {
										if (required.reqPoints === pointType2.id) {
											// Is there more points than required?
											if (
												pi(required.operator) === 1 &&
												pi(pointType.startingSum) >= pi(pointType2.startingSum)
											) {
												return false;
												// Is there more or equal points to required?
											} else if (
												pi(required.operator) === 2 &&
												pi(pointType.startingSum) > pi(pointType2.startingSum)
											) {
												return false;
												// Is there THIS many points?
											} else if (
												pi(required.operator) === 3 &&
												pi(pointType.startingSum) !== pi(pointType2.startingSum)
											) {
												return false;
												// Is there less or equal points to required?
											} else if (
												pi(required.operator) === 4 &&
												pi(pointType.startingSum) < pi(pointType2.startingSum)
											) {
												return false;
												// Is there less points than required?
											} else if (
												pi(required.operator) === 5 &&
												pi(pointType.startingSum) <= pi(pointType2.startingSum)
											) {
												return false;
											}
										}
									}
								}
							}
						}
					}
				} else if (required.type === 'or') {
					let check = false;
					for (const orRequired of required.orRequired) {
						if (!app.activated.includes(orRequired.req) && orRequired.req != '') check = true;
					}
					// Checks if one of the requireds is selected.
					if (!check) return false;
				}
			}
		}
	}
	return true;
}

function checkPoints(object: Object, pointTypes: PointType[]) {
	let check = true;
	// Then make the one that

	for (const score of object.scores) {
		if (checkRequireds(score) && !score.isActive) {
			// Goes trough all of the scores and check which is fits.
			for (const pointType of pointTypes) {
				if (pointType.id === score.id && pointType.belowZeroNotAllowed) {
					if (pi(pointType.startingSum) - pi(score.value) < 0) check = false;
				}
			}
		}
	}

	return check;
}

// Sets the state as default, cleans all activated and refounds all used points.
export function cleanActivated() {
	// For each of the rows.
	for (const row of app.rows) {
		row.isEditModeOn = false;
		if (pi(row.allowedChoicesChange) > 0)
			row.allowedChoices = pi(row.allowedChoices) - pi(row.allowedChoicesChange);

		// For each of the objects.
		for (const object of row.objects) {
			if (!object.isSelectableMultiple) continue;

			// Will go trough all tiers left to lowest tier.
			if (object.isMultipleUseVariable) {
				for (let g = 0; g < pi(object.multipleUseVariable); g++) {
					let isLessThanLimit = true;

					for (const pointType of app.pointTypes) {
						if (pointType.id === object.multipleScoreId) {
							if (pi(object.numMultipleTimesMinus) < pi(pointType.startingSum))
								pointType.startingSum = pi(pointType.startingSum) - 1;
							else isLessThanLimit = false;
						}
					}

					if (isLessThanLimit) {
						for (const score of object.scores) {
							// Goes trough all of the scores and check which is fits.
							for (const pointType of app.pointTypes) {
								if (pointType.id === score.id && checkRequireds(score)) {
									pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
								}
							}
						}
					}
				}
			} else {
				for (
					let g = 0;
					g < pi(object.numMultipleTimesPluss) - pi(object.numMultipleTimesMinus);
					g++
				) {
					let isLessThanLimit = true;

					for (const pointType of app.pointTypes) {
						if (pointType.id === object.multipleScoreId) {
							if (pi(object.numMultipleTimesMinus) < pi(pointType.startingSum))
								pointType.startingSum = pi(pointType.startingSum) - 1;
							else isLessThanLimit = false;
						}
					}

					if (isLessThanLimit) {
						for (const score of object.scores) {
							// Goes trough all of the scores and check which is fits.
							for (const pointType of app.pointTypes) {
								if (pointType.id === score.id && checkRequireds(score))
									pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
							}
						}
					}
				}
			}

			object.multipleUseVariable = 0;
			object.selectedThisManyTimesProp = 0;
			object.forcedActivated = false;
		}
	}

	// For each of the rows.
	for (const row of app.rows) {
		row.isEditModeOn = false;
		// For each of the objects.
		for (const object of row.objects) {
			if (object.isActive) {
				// Deactivate the choice.
				object.isActive = false;
				row.currentChoices = 0;

				if (object.activateOtherChoice && typeof object.activateThisChoice !== 'undefined') {
					for (const choice of object.activateThisChoice.split(',').toReversed())
						for (const row of app.rows)
							for (const object of row.objects)
								if (object.isSelectableMultiple) {
									if (object.id === choice.split('/ON#')[0]) {
										const num = pi(choice.split('/ON#')[1]);
										if (num > 0) {
											for (let i = 0; i < num; i++)
												if (object.numMultipleTimesMinus)
													object.numMultipleTimesMinus = pi(object.numMultipleTimesMinus) - 1;
										} else if (num < 0) {
											for (let i = 0; i < -num; i++)
												if (object.numMultipleTimesMinus)
													object.numMultipleTimesMinus = pi(object.numMultipleTimesMinus) + 1;
										}
									}
								}
				}

				// For each of the scores.
				for (const score of object.scores) {
					for (const pointType of app.pointTypes) {
						if (pointType.id === score.id) {
							// If the score has a required, and there is more requirements than 0.
							if (typeof score.requireds !== 'undefined' && score.requireds.length > 0) {
								// If the score has been activated.
								if (score.isActive) {
									score.isActive = false;
									pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
								}
							} else {
								pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
							}
						}
					}
				}
			} else if (object.isImageUpload) {
				object.image = '';
			}
		}
	}
}

function checkPointsA(object: Object) {
	for (const score of object.scores) {
		if (checkRequireds(score) && !score.isActive) {
			for (const pointType of app.pointTypes) {
				if (
					pointType.id === score.id &&
					pointType.belowZeroNotAllowed &&
					pi(pointType.startingSum) - pi(score.value) < 0
				)
					return false;
			}
		}
	}
}

function checkPointsR(object: Object) {
	for (const score of object.scores) {
		if (checkRequireds(score) && !score.isActive) {
			for (const pointType of app.pointTypes) {
				if (
					pointType.id == score.id &&
					pointType.belowZeroNotAllowed &&
					pi(pointType.startingSum) + pi(score.value) < 0
				) {
					return false;
				}
			}
		}
	}
	return true;
}

// used when the - in a multiple is pressed.
export function selectedOneMore(object: Object) {
	let isLessThanLimit = true;

	// If the multiple choice uses its own variable.
	if (object.isMultipleUseVariable) {
		object.multipleUseVariable = object.multipleUseVariable ?? 0;
		if (pi(object.numMultipleTimesPluss) > pi(object.multipleUseVariable) && checkPointsA(object)) {
			object.multipleUseVariable = pi(object.multipleUseVariable) + 1;
			object.selectedThisManyTimesProp = object.multipleUseVariable;
		} else {
			isLessThanLimit = false;
		}
	} else {
		for (const pointType of app.pointTypes) {
			if (pointType.id === object.multipleScoreId) {
				if (pi(object.numMultipleTimesPluss) > pi(pointType.startingSum)) {
					pointType.startingSum = pi(pointType.startingSum) + 1;
					object.selectedThisManyTimesProp = pointType.startingSum;
				} else {
					isLessThanLimit = false;
				}
			}
		}
	}
	if (isLessThanLimit) {
		for (const score of object.scores) {
			// Goes trough all of the scores and check which is fits.
			for (const pointType of app.pointTypes) {
				if (pointType.id === score.id && checkRequireds(score))
					pointType.startingSum = pi(pointType.startingSum) - pi(score.value);
			}
		}
		if (
			object.isActive === false &&
			object.selectedThisManyTimesProp &&
			object.numMultipleTimesMinus &&
			pi(object.selectedThisManyTimesProp) > pi(object.numMultipleTimesMinus)
		)
			object.isActive = true;
	}
}

// used when the + in a multiple is pressed.
export function selectedOneLess(object: Object) {
	let isLessThanLimit = true;
	// If the multiple choice uses its own variable.
	if (object.isMultipleUseVariable) {
		object.multipleUseVariable = object.multipleUseVariable ?? 0;
		if (pi(object.numMultipleTimesMinus) < object.multipleUseVariable && checkPointsR(object)) {
			object.multipleUseVariable--;
			object.selectedThisManyTimesProp = object.multipleUseVariable;
		} else {
			isLessThanLimit = false;
		}
	} else {
		for (const pointType of app.pointTypes) {
			if (pointType.id === object.multipleScoreId) {
				if (pi(object.numMultipleTimesMinus) < pi(pointType.startingSum)) {
					pointType.startingSum = pi(pointType.startingSum) - 1;
					object.selectedThisManyTimesProp = pointType.startingSum;
				} else {
					isLessThanLimit = false;
				}
			}
		}
	}
	if (isLessThanLimit) {
		for (const score of object.scores) {
			// Goes trough all of the scores and check which is fits.
			for (const pointType of app.pointTypes) {
				if (pointType.id === score.id && checkRequireds(score)) {
					pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
				}
			}
		}
		if (
			object.isActive === true &&
			object.selectedThisManyTimesProp &&
			object.numMultipleTimesMinus &&
			pi(object.selectedThisManyTimesProp) == pi(object.numMultipleTimesMinus) &&
			(typeof object.forcedActivated === 'undefined' || object.forcedActivated === false)
		)
			object.isActive = false;
	}
}

// When someone clicks on a object this process needs to happen.
export function activateObject(object: Object, row: Row | Backpack) {
	const { activated, pointTypes, rows, groups, words } = app;
	const hasRequireds = checkRequireds(object);
	const hasPoints = checkPoints(object, pointTypes);

	// Will here run trugh all the scores, and check if there is enough
	// 1. Find the type of points and how many there is.
	// 2. take the points off, or add.

	// Used to make the activated change when a selected is pressed.
	if (
		pi(row.currentChoices) + 1 > pi(row.allowedChoices) &&
		!object.isActive &&
		row.allowedChoices != 0
	) {
		// For each of the objects in the row.
		// Check if the number of allowed choices allows it.
		for (const object of row.objects) {
			if (object.isActive && pi(row.currentChoices) + 1 > pi(row.allowedChoices))
				activateObject(object, row);
		}
	}

	// If hasRequireds is true, and currentchoices is not above allowedChoices.
	if (
		hasRequireds &&
		hasPoints &&
		(pi(row.currentChoices) < pi(row.allowedChoices) || pi(row.allowedChoices) === 0)
	) {
		// If the array does not have this id-from before of, turn on.
		if (!activated.includes(object.id)) {
			// Adds the object-id into the

			// Then make the one that
			for (const score of object.scores) {
				if (checkRequireds(score) && !score.isActive) {
					// Goes trough all of the scores and check which is fits.
					for (const pointType of pointTypes) {
						if (pointType.id === score.id) {
							pointType.startingSum = pi(pointType.startingSum) - pi(score.value);
							score.isActive = true;
						}
					}
				}
			}

			// Is the FUNCTIONS, happens when the object is selected.
			// ------------------------------------------------------

			// Music
			  if (object.stopsMusic) {
                stopMusic();
            } else if (object.playsMusic && object.musicFile) {
                playMusic(object.musicFile);
            }


			// This activates cleaning if the function is activated.
			if (object.cleanACtivatedOnSelect) {
				cleanActivated();
				app.activated.splice(0);
			}

			// This will force activate another choice.
			if (object.activateOtherChoice && typeof object.activateThisChoice !== 'undefined') {
				const array = object.activateThisChoice.split(',');

				// First handle all child activations
				for (const el of array.toReversed()) {
					for (const row of rows) {
						for (const childObject of row.objects) {
							if (childObject.isSelectableMultiple) {
								if (childObject.id === el.split('/ON#')[0]) {
									const num = pi(el.split('/ON#')[1]);
									if (num > 0) {
										for (let i = 0; i < num; i++) {
											if (childObject.numMultipleTimesMinus)
												childObject.numMultipleTimesMinus = pi(childObject.numMultipleTimesMinus) - 1;
											childObject.forcedActivated = true;
											selectedOneLess(childObject);
										}
									} else if (num < 0) {
										for (let i = 0; i < -num; i++) {
											selectedOneMore(childObject);
											childObject.forcedActivated = true;
											if (childObject.numMultipleTimesMinus)
												childObject.numMultipleTimesMinus = pi(childObject.numMultipleTimesMinus) + 1;
										}
									}
								}
							} else {
								if (childObject.id === el) {
									// Only activate if not already active
									if (!childObject.isActive) {
										childObject.isNotSelectable = false;
										activateObject(childObject, row);
									}
									// Set forcedActivated only if parent doesn't have isAllowDeselect
									if (typeof object.isAllowDeselect === 'undefined' || object.isAllowDeselect === false) {
										childObject.forcedActivated = true;
									}
								}
							}
						}
					}
				}
			}

			// This will deactivate another choice.
			if (object.deactivateOtherChoice) {
				const array = object.deactivateThisChoice?.split(',') ?? [];

				for (const el of array) {
					for (const row of rows) {
						for (const object of row.objects) {
							if (object.isSelectableMultiple) {
								if (object.id === el.split('/ON#')[0]) {
									const num = pi(el.split('/ON#')[1]);
									if (num > 0) {
										for (let i = 0; i < num; i++) {
											selectedOneMore(object);
										}
									} else if (num < 0) {
										for (let i = 0; i < -num; i++) {
											selectedOneLess(object);
										}
									}
								}
							} else {
								if (!((object.id !== el && row.resultGroupId !== el) || !object.isActive))
									activateObject(object, row);
							}
						}
					}

					// Checks if the id added in one of the groups in feature.
					//let groupIdArray = this.newActivated.split(",");
					for (const group of groups) {
						if (group.id === el) {
							for (const row of rows) {
								for (const object of row.objects) {
									for (const group of object.groups) {
										if (group.id === el && object.isActive) {
											//this.app.rows[c].objects[m].isActive = false;
											activateObject(object, row);
										}
									}
								}
							}
						}
					}
				}
			}

			let allChanges = 'Scores Updated On: ';
			// Will go trough all of the scores and see if there is any requirements with this id.
			for (const row of rows) {
				for (const objects of row.objects) {
					for (const score of objects.scores) {
						for (const required of score.requireds) {
							if (objects.isActive) {
								if (required.reqId === object.id) {
									if (allChanges.length === 19) allChanges += objects.title;
									else allChanges += ', ' + objects.title;
									activateObject(objects, row);
								} else if (JSON.stringify(required).includes('"' + object.id + '"')) {
									if (allChanges.length === 19) allChanges += objects.title;
									else allChanges += ', ' + objects.title;
									activateObject(objects, row);
								}
							} else if (objects.isSelectableMultiple) {
								if (JSON.stringify(required).includes('"' + object.id + '"')) {
									console.log('one');

									if (allChanges.length === 19 && pi(objects.multipleUseVariable) > 0) {
										allChanges += objects.title;
									} else if (pi(objects.multipleUseVariable) > 0) {
										allChanges += ', ' + objects.title;
									}

									for (
										let i = 0;
										i < pi(objects.numMultipleTimesPluss) - pi(objects.numMultipleTimesMinus);
										i++
									) {
										selectedOneLess(objects);
									}
								}
							}
						}
					}
				}
			}
			if (allChanges !== 'Scores Updated On: ') toast(allChanges + '.');

			// This will multiply a point type when activated.
			if (object.multiplyPointtypeIsOn) {
				// used when checing if
				object.multiplyPointtypeIsOnCheck = true;
				for (const pointType of pointTypes) {
					if (pointType.id === object.pointTypeToMultiply) {
						if (!object.multiplyPointtypeIsId) {
							object.startingSumAtMultiply =
								pi(pointType.startingSum) * pi(object.multiplyWithThis) - pi(pointType.startingSum);

							pointType.startingSum = pi(pointType.startingSum) * pi(object.multiplyWithThis);
							// If the multiplyWithThis is a ID
						} else {
							for (const pointType2 of pointTypes) {
								if (pointType2.id === object.multiplyWithThis) {
									object.startingSumAtMultiply =
										pi(pointType.startingSum) * pi(pointType2.startingSum) -
										pi(pointType.startingSum);
									pointType.startingSum = pi(pointType.startingSum) * pi(pointType2.startingSum);
								}
							}
						}
					}
				}
			}

			// This will divide a point type when activated.
			if (object.dividePointtypeIsOn) {
				// used when checing if
				object.dividePointtypeIsOnCheck = true;
				for (const pointType of pointTypes) {
					if (pointType.id === object.pointTypeToDivide) {
						pointType.startingSum = pi(pointType.startingSum) / pi(object.divideWithThis);
						console.log('Multiply:');
					}
				}
			}

			// This will change the Allowed Choices of Row.
			if (object.addToAllowChoice) {
				for (const row of rows) {
					if (object.idOfAllowChoice === row.id) {
						row.allowedChoices = pi(row.allowedChoices) + pi(object.numbAddToAllowChoice);

						if (isNaN(pi(row.allowedChoicesChange))) row.allowedChoicesChange = 0;

						row.allowedChoicesChange =
							pi(row.allowedChoicesChange) + pi(object.numbAddToAllowChoice); // Added to keep record.

						let numActive = 0;
						for (const object of row.objects) {
							if (object.isActive) numActive++;
						}

						// If there is more active than is allowed, need to turna few off.
						if (numActive > row.allowedChoices) {
							let deactivateChoices = numActive - row.allowedChoices;
							for (const object of row.objects) {
								if (deactivateChoices > 0 && object.isActive) {
									activateObject(object, row);
									deactivateChoices--;
								}
							}
						}
					}
				}
			}

			// This will divide a point type when activated.
			if (object.textfieldIsOn) {
				// used when checing if

				for (const word of words) {
					if (word.id === object.idOfTheTextfieldWord)
						word.replaceText = object.wordChangeSelect ?? '';
				}
			}

			activated.push(object.id);
			row.currentChoices += 1;

			// Deletes the the id from the array.
		} else {

			// --- Music logic on deactivation ---
            const track = get(currentTrack);
            // If this object was playing music (its file name is the same as the current track), we stop it.
            if (object.playsMusic && object.musicFile && object.musicFile === track) {
                stopMusic();
            }

			for (const score of object.scores) {
				if ((checkRequireds(score) && score.isActive) || score.isActive) {
					// Goes trough all of the scores and check which is fits.
					for (const pointType of pointTypes) {
						if (pointType.id === score.id) {
							pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
							score.isActive = false;
						}
					}
				}
			}

			// Is the FUNCTIONS, happens when the object is deselected.
			// ------------------------------------------------------

			// This will force activate another choice.
			if (object.activateOtherChoice && typeof object.activateThisChoice !== 'undefined') {
				const array = object.activateThisChoice.split(',');

				// First handle all child deactivations
				for (const el of array.toReversed()) {
					for (const row of rows) {
						for (const childObject of row.objects) {
							if (childObject.isSelectableMultiple) {
								if (childObject.id === el.split('/ON#')[0]) {
									const num = pi(el.split('/ON#')[1]);
									if (num > 0) {
										for (let i = 0; i < num; i++) {
											selectedOneMore(childObject);
											childObject.forcedActivated = false;
											if (childObject.numMultipleTimesMinus)
												childObject.numMultipleTimesMinus = pi(childObject.numMultipleTimesMinus) + 1;
										}
									} else if (num < 0) {
										for (let i = 0; i < -num; i++) {
											if (childObject.numMultipleTimesMinus)
												childObject.numMultipleTimesMinus = pi(childObject.numMultipleTimesMinus) - 1;
											childObject.forcedActivated = false;
											selectedOneLess(childObject);
										}
									}
								}
							} else {
								if (childObject.id === el) {
									// Only deactivate if currently active and isNotDeactivate is not set
									if (childObject.isActive && !object.isNotDeactivate) {
										activateObject(childObject, row);
									}
									// Reset child object state when parent deactivates
									childObject.isNotSelectable = false;
									childObject.forcedActivated = false;
								}
							}
						}
					}
				}
			}

			// This will deactivate another choice.
			if (object.deactivateOtherChoice) {
				const array = object.deactivateThisChoice?.split(',') ?? [];

				for (const el of array) {
					for (const row of rows) {
						for (const object of row.objects) {
							if (object.isSelectableMultiple) {
								if (object.id === el.split('/ON#')[0]) {
									const num = pi(el.split('/ON#')[1]);
									if (num > 0) {
										for (let i = 0; i < num; i++) {
											if (object.numMultipleTimesMinus)
												object.numMultipleTimesMinus = pi(object.numMultipleTimesMinus) - 1;
											selectedOneLess(object);
										}
									} else if (num < 0) {
										for (let i = 0; i < -num; i++) {
											selectedOneMore(object);
											if (object.numMultipleTimesMinus)
												object.numMultipleTimesMinus = pi(object.numMultipleTimesMinus) + 1;
										}
									}
								}
							} else {
								if (!((object.id !== el && row.resultGroupId !== el) || !object.isActive))
									activateObject(object, row);
							}
						}
					}

					// Checks if the id added in one of the groups in feature.
					//let groupIdArray = this.newActivated.split(",");
					for (const group of groups) {
						if (group.id === el) {
							for (const row of rows) {
								for (const object of row.objects) {
									for (const group of object.groups) {
										if (group.id === el && object.isActive) {
											//this.app.rows[c].objects[m].isActive = false;
											activateObject(object, row);
										}
									}
								}
							}
						}
					}
				}
			}

			let allChanges = 'Scores Updated On: ';
			// Will go trough all of the scores and see if there is any requirements with this id.
			for (const row of rows) {
				for (const objects of row.objects) {
					for (const score of objects.scores) {
						for (const required of score.requireds) {
							if (objects.isActive) {
								if (
									required.reqId === object.id ||
									JSON.stringify(required).includes('"' + object.id + '"')
								) {
									if (allChanges.length === 19) {
										allChanges += objects.title;
									} else {
										allChanges += ', ' + objects.title;
									}
									activateObject(objects, row);
								}
							} else if (objects.isSelectableMultiple) {
								if (JSON.stringify(required).includes('"' + object.id + '"')) {
									console.log('one');

									if (allChanges.length === 19 && pi(objects.multipleUseVariable) > 0) {
										allChanges += objects.title;
									} else if (pi(objects.multipleUseVariable) > 0) {
										allChanges += ', ' + objects.title;
									}

									for (
										let i = 0;
										i < pi(objects.numMultipleTimesPluss) - pi(objects.numMultipleTimesMinus);
										i++
									) {
										selectedOneLess(objects);
									}
								}
							}
						}
					}
				}
			}
			if (allChanges !== 'Scores Updated On: ') toast(allChanges + '.');

			// This will divide a point type when activated.
			if (object.multiplyPointtypeIsOnCheck) {
				// used when checing if
				object.multiplyPointtypeIsOnCheck = false;
				for (const pointType of pointTypes) {
					if (pointType.id === object.pointTypeToMultiply) {
						pointType.startingSum = pi(pointType.startingSum) - pi(object.startingSumAtMultiply);
						//this.app.pointTypes[c].startingSum /= object.multiplyWithThis;
						console.log('Multiply:' + object.startingSumAtMultiply);
					}
				}
			}

			// This will multiply a point type when activated.
			if (object.dividePointtypeIsOnCheck) {
				// used when checing if
				object.dividePointtypeIsOnCheck = false;
				for (const pointType of pointTypes) {
					if (pointType.id === object.pointTypeToDivide) {
						pointType.startingSum = pi(pointType.startingSum) * pi(object.divideWithThis);
						console.log('Multiply:');
					}
				}
			}

			// This will divide a point type when activated.
			if (object.textfieldIsOn) {
				// used when checing if

				for (const word of words) {
					if (word.id === object.idOfTheTextfieldWord) {
						word.replaceText = object.wordChangeDeselect ?? '';
					}
				}
			}

			// This will change the Allowed Choices of Row.
			if (object.addToAllowChoice) {
				for (const row of rows) {
					if (object.idOfAllowChoice === row.id) {
						row.allowedChoices = pi(row.allowedChoices) - pi(object.numbAddToAllowChoice);
						let numActive = 0;
						for (const object of row.objects) {
							if (object.isActive) numActive++;
						}

						// If there is more active than is allowed, need to turna few off.
						if (numActive > row.allowedChoices) {
							let deactivateChoices = numActive - row.allowedChoices;
							for (const object of row.objects) {
								if (deactivateChoices > 0 && object.isActive) {
									activateObject(object, row);
									deactivateChoices--;
								}
							}
						}
					}
				}
			}

			// Delete the id from the activated array
			activated.splice(activated.indexOf(object.id), 1);
			row.currentChoices -= 1;
		}

		// Switches the isActive and updates the object.
		object.isActive = !object.isActive;

		// If the object.id is in the activated-array, but required is not there.
		// Turns the object off after removing the points.
	} else if (activated.includes(object.id)) {
		// Removes this id from the activated array.
		activated.splice(activated.indexOf(object.id), 1);

		for (const score of object.scores.toReversed()) {
			if ((checkRequireds(score) && score.isActive) || score.isActive) {
				// Goes trough all of the scores and check which is fits.
				for (const pointType of pointTypes) {
					if (pointType.id === score.id) {
						pointType.startingSum = pi(pointType.startingSum) + pi(score.value);
						score.isActive = false;
					}
				}
			}
		}

		// Is the FUNCTIONS, happens when the object is selected.
		// ------------------------------------------------------

		// This will force activate another choice.
		if (object.activateOtherChoice && typeof object.activateThisChoice !== 'undefined') {
			const array = object.activateThisChoice.split(',');

			for (const el of array) {
				// This will force activate another choice.

				for (const row of rows) {
					for (const object of row.objects) {
						if (object.isSelectableMultiple) {
							if (object.id === el.split('/ON#')[0]) {
								const num = pi(el.split('/ON#')[1]);
								if (num > 0) {
									for (let i = 0; i < num; i++) {
										if (object.numMultipleTimesMinus)
											object.numMultipleTimesMinus = pi(object.numMultipleTimesMinus) - 1;
										object.forcedActivated = false;
										selectedOneLess(object);
									}
								} else if (num < 0) {
									object.multipleUseVariable = 0;
									for (let i = 0; i < -num; i++) {
										selectedOneMore(object);
										object.forcedActivated = false;
										if (object.numMultipleTimesMinus)
											object.numMultipleTimesMinus = pi(object.numMultipleTimesMinus) + 1;
									}
								}
							}
						} else {
							if (object.id === el && object.isActive) {
								object.isNotSelectable = false;
								activateObject(object, row);
							}
						}
					}
				}
			}
		}

		// This will change the Allowed Choices of Row.
		if (object.addToAllowChoice) {
			for (const row of rows) {
				if (object.idOfAllowChoice === row.id) {
					row.allowedChoices = pi(row.allowedChoices) - pi(object.numbAddToAllowChoice);
					let numActive = 0;
					for (const object of row.objects) {
						if (object.isActive) numActive++;
					}

					// If there is more active than is allowed, need to turna few off.
					if (numActive > row.allowedChoices) {
						let deactivateChoices = numActive - row.allowedChoices;
						for (const object of row.objects) {
							if (deactivateChoices > 0 && object.isActive) {
								activateObject(object, row);
								deactivateChoices--;
							}
						}
					}
				}
			}
		}

		// Switches the isActive and updates the object.
		object.isActive = !object.isActive;
		row.currentChoices -= 1;
	} else {
		// Does not have the required, nothing happens.
	}
}

export function checkIfDeselect(row: Row | Backpack) {
	let res = false;
	res = checkRequireds(row);
	if (row.deselectChoices && !res) {
		for (const obj of row.objects) {
			if (obj.isActive && pi(row.currentChoices) + 1 > pi(row.allowedChoices))
				activateObject(obj, row);
		}
	}
	return res;
}

export function handleButtonActivate(row: Row | Backpack) {
	// If the button is the type that will select X random or add variable to activated-array.
	if (row.btnPointAddon && row.buttonTypeRadio === 'sumaddon') {
		//If Random
		const random = Math.floor(
			Math.random() * (pi(row.randomMax) - pi(row.randomMin)) + pi(row.randomMin)
		);

		for (const pointType of app.pointTypes) {
			if (pointType.id == row.pointTypeRandom)
				pointType.startingSum = pi(pointType.startingSum) + random;
		}
	} else {
		// If the button is the type that will select X random or add variable to activated-array.
		if (row.buttonRandom) {
			const randomArray: number[] = [];

			// Is it uniform random or weighted random.
			if (!row.isWeightedRandom || typeof row.isWeightedRandom === 'undefined') {
				// For each of the random choices that will be selected.
				for (let i = 0; i < row.buttonRandomNumber; i++) {
					let random = Math.floor(Math.random() * row.objects.length);
					let randomObject = row.objects[random];

					// To stop an unending while loop.
					const maxTries = 100;
					let tryNumber = 0;
					let foundOne = true;

					// If only unselected choices is allowed to be selected.
					if (row.onlyUnselectedChoices) {
						// While the random is not unique and the elements requireds does not fit.
						while (
							randomArray.includes(random) ||
							app.activated.includes(randomObject.id) ||
							!checkRequireds(randomObject) ||
							randomObject.isNotSelectable
						) {
							tryNumber++;
							random = Math.floor(Math.random() * row.objects.length);
							randomObject = row.objects[random];

							// Breaks the loop if the number of objects if fewer or equal to the randomNumber.
							// Or if max tries have been surpassed.
							if (row.objects.length <= i || maxTries <= tryNumber) {
								foundOne = false;
								break;
							}
						}
					} else {
						// While the random is not unique and the elements requireds does not fit.
						while (
							randomArray.includes(random) ||
							!checkRequireds(randomObject) ||
							randomObject.isNotSelectable
						) {
							tryNumber++;
							random = Math.floor(Math.random() * row.objects.length);
							randomObject = row.objects[random];

							// Breaks the loop if the number of objects if fewer or equal to the randomNumber.
							// Or if max tries have been surpassed.
							if (row.objects.length <= i || maxTries <= tryNumber) {
								break;
							}
						}
					}

					if (foundOne) {
						// Push random into random-array.
						randomArray.push(random);

						// Checks if the objects have all requireds.
						activateObject(randomObject, row);
					}
				}

				// The random is weighted.
			} else {
				let randomTotalWeight = 0;
				let randomCumuWeight = 0;
				// sum up the weights
				for (const object of row.objects) {
					// If the number is default, not yet set
					if (typeof object.randomWeight === 'undefined' || object.randomWeight === '') {
						randomTotalWeight += 100;
					} else {
						randomTotalWeight += pi(object.randomWeight);
					}
				}

				// Use a while to ensure that things has required and is only selected once.
				for (let x = 0; x < row.buttonRandomNumber; x++) {
					const random = Math.floor(Math.random() * randomTotalWeight);
					console.log(random);

					// For each of the rows check if the choice is unique.
					for (const object of row.objects) {
						if (typeof object.randomWeight === 'undefined' || object.randomWeight === '') {
							randomCumuWeight += 100;
						} else {
							randomCumuWeight += pi(object.randomWeight);
						}
						if (random < randomCumuWeight) {
							// Checks if the objects have all requireds.
							activateObject(object, row);

							break;
						}
					}
				}
			}
		} else if (!row.buttonRandom) {
			// Checks if the choice should be permanent or not.
			if (row.buttonType) {
				if (app.activated.includes(row.buttonId))
					app.activated.splice(app.activated.indexOf(row.buttonId), 1);
				else app.activated.push(row.buttonId);
			} else {
				app.activated.push(row.buttonId);
			}
		}
	}
}

export function loadApp(n: App) {
	const ids = new Set();
	for (const row of n.rows) {
		for (const object of row.objects) {
			if (ids.has(object.id)) {
				console.error('Duplicate id', object.id);
			}
			ids.add(object.id);
		}
		if (ids.has(row.id)) {
			console.error('Duplicate id', row.id);
		}
	}

	for (const key of new Set(Object.keys(app).concat(Object.keys(n)) as (keyof typeof app)[])) {
		if (n[key] === undefined) {
			delete app[key];
		} else {
			(app as { [key in keyof typeof app]: unknown })[key] = n[key];
		}
	}

	// Handle backgroundImages
	if (n.styling && Array.isArray(n.styling.selFilterBgImages) && n.styling.selFilterBgImages.length > 0) {
		app.styling.selFilterBgImages = [...n.styling.selFilterBgImages];
		// Update the backgroundImages store
		backgroundImages.set(app.styling.selFilterBgImages);
		console.log('Loaded background images:', JSON.stringify(app.styling.selFilterBgImages));
	} else {
		console.log('No background images found in loaded data');
	}
}
