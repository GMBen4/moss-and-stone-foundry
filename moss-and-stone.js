const SYSTEM_ID = "moss-and-stone";
const SYSTEM_VERSION = "1.0.0";
const STARTER_ITEM_LIBRARY_VERSION = "0.7.1";

function mossCard(title, body, tone = "") {
  const cls = tone ? ` moss-chat-${tone}` : "";
  return `<div class="moss-chat moss-roll-card${cls}"><h3>${title}</h3>${body}</div>`;
}

// Dice So Nice listens for displayed rolls, but Bug-Fu and Feisty are intentionally
// folded into the parent Attack chat card rather than posting separate messages.
// Send those supplemental rolls directly to DSN when it is active so the 3D dice
// still appear without cluttering chat. This is a no-op when DSN is not installed.
function showSupplemental3DRoll(roll) {
  const dice3d = game?.dice3d;
  if (!dice3d?.showForRoll) return Promise.resolve();
  // Do not synchronize supplemental animations with the rules workflow.
  // The parent attack is posted first, then these dice are displayed without
  // blocking Foundry while Dice So Nice finishes its animation.
  return Promise.resolve(dice3d.showForRoll(roll, game.user, false)).catch((err) => {
    console.warn("Moss and Stone | Dice So Nice supplemental roll display failed", err);
  });
}



const WHISPER_STONES = {
  "": {label:"— Choose Whisper Stone —", description:"", table:0, row:0},
  illusion:{label:"Whisper Stone of Illusion",table:1,row:1,description:"Control light to create an illusion of your design. The illusion lasts for one scene but is not solid."},
  whispers:{label:"Whisper Stone of Whispers",table:1,row:2,description:"The stone whispers emotions into your mind. The RR reveals something important about the area you are currently in."},
  majorWind:{label:"Whisper Stone of Major Wind",table:1,row:3,description:"Summon a huge gust that blows normal and smaller creatures from Near to Far. If a solid object is in their path, they take 2 damage."},
  animating:{label:"Whisper Stone of Animating",table:1,row:4,description:"Animate nearby stones into a stone golem. It can perform one action with incredible strength, then collapses."},
  terror:{label:"Whisper Stone of Terror",table:1,row:5,description:"A chosen enemy automatically fails all Predator Rolls for the entirety of combat."},
  mossSteed:{label:"Whisper Stone of Moss Steed",table:1,row:6,description:"Summon a moss creature large enough to ride, such as a bird, fish, or lizard. It lasts for one day."},
  scooting:{label:"Whisper Stone of Scooting",table:2,row:1,description:"The stone grows large enough for you and two others to sit on and hovers just above the ground. Steer it at high speed with your thoughts."},
  squelch:{label:"Whisper Stone of Squelch",table:2,row:2,description:"Throw the stone. Ground within Near of where it lands becomes soft and wet, slowly swallowing those standing in it."},
  arcing:{label:"Whisper Arcing",table:2,row:3,description:"A lightning bolt hits an enemy for 1 Strike, then jumps to another enemy Near that target, continuing while another valid enemy is Near. It cannot hit the same enemy twice."},
  waterBubble:{label:"Whisper Stone of Water Bubble",table:2,row:4,description:"Encases you and up to a dozen others in a water globe for up to one scene. It protects from fire, can roll like a ball, and everyone inside can breathe normally."},
  tracking:{label:"Whisper Stone of Tracking",table:2,row:5,description:"Choose a creature or critter, even one you have never seen. Ghostly images reveal a direct trail to its current location for one day."},
  greenStorage:{label:"Whisper Stone of Green Storage",table:2,row:6,description:"Place an object into a patch of moss. Later, pull it back out from any patch of moss in the world."},
  lucky:{label:"Whisper Stone of the Lucky",table:3,row:1,description:"Gain a Boon on every check for one scene."},
  buoyancy:{label:"Whisper Stone of Buoyancy",table:3,row:2,description:"You cannot sink in liquid until you deactivate the stone."},
  muddyMimicry:{label:"Whisper Stone of Muddy Mimicry",table:3,row:3,description:"Create a mud replica of yourself or a party member. It copies the critter's stats and abilities but cannot use items, Karma, or Hero Dice."},
  stoneWarp:{label:"Whisper Stone of Stone Warp",table:3,row:4,description:"Create two connected portals on stone surfaces, large enough for one person at a time. They last for one scene unless deactivated early."},
  calmingPresence:{label:"Whisper Stone of Calming Presence",table:3,row:5,description:"Convince a wild animal of any size to stand down, help, or leave for one scene. Does not work on Hollow Eyes or Hollow Tongues."},
  sanctuary:{label:"Whisper Stone of Sanctuary",table:3,row:6,description:"Place the stone on the ground to raise moss-covered stones into a shelter just large enough for the party."},
  timeShift:{label:"Whisper Stone of Time Shift",table:4,row:1,description:"For one scene, time slows for everyone but you. Move twice as fast and take double the actions."},
  listening:{label:"Whisper Stone of Listening",table:4,row:2,description:"Amplifies sound so you can hear even very quiet sounds from an extremely Far distance for one day without harming your ears."},
  haze:{label:"Whisper Stone of Haze",table:4,row:3,description:"Plants and fungi release a thick haze that affects only enemies. For the scene, your attacks gain an additional Boon and enemies attack with a Bane."},
  reflection:{label:"Whisper Stone of Reflection",table:4,row:4,description:"Spinning stones block all ranged attacks against you for the scene unless the attacker rolls a 6."},
  spokenPersuasion:{label:"Whisper Stone of Spoken Persuasion",table:4,row:5,description:"A chosen creature is overcome by the Green Voice's presence and cannot lie for three questions."},
  mossWalk:{label:"Whisper Stone of Moss Walk",table:4,row:6,description:"Touch moss to become one with it and travel anywhere that connected moss reaches. Lasts one scene."},
  frozenTime:{label:"Whisper Stone of Frozen Time",table:5,row:1,description:"Freeze a creature or object in time and space so it cannot be interacted with for one scene, about ten minutes."},
  binding:{label:"Whisper Stone of Binding",table:5,row:2,description:"Unbreakable moss-covered vines tether two beings together. They cannot move more than 10 feet apart for up to one day unless one dies."},
  flight:{label:"Whisper Stone of Flight",table:5,row:3,description:"Gain wings and the ability to fly for one scene."},
  frozenFloor:{label:"Whisper Stone of Frozen Floor",table:5,row:4,description:"Freeze the ground in a chosen area. Enemies must roll 4+ before acting each turn; failure means they slip and spend the turn getting up."},
  parasiticSwarm:{label:"Whisper Stone of Parasitic Swarm",table:5,row:5,description:"Summon a swarm of flesh-eating parasites. Enemies roll 6+ each turn or take 1 Strike. The swarm stops attacking an individual enemy after that enemy succeeds."},
  favoredLight:{label:"Whisper Stone of Favored Light",table:5,row:6,description:"Bend light around yourself to become completely invisible for one scene."},
  open:{label:"Whisper Stone of the Open",table:6,row:1,description:"Any mechanical locking mechanism completely fades from existence."},
  vision:{label:"Whisper Stone of Vision",table:6,row:2,description:"For one scene, see through walls and other objects as though they were not there."},
  mossHorde:{label:"Whisper Stone of Moss Horde",table:6,row:3,description:"Five small moss creatures rise and attack at your command. They are hit on anything but a 1, have 1 Strike each, and have no Boons or Banes. They collapse when the scene ends."},
  protection:{label:"Whisper Stone of Protection",table:6,row:4,description:"Stones swarm around every party member. On a failed Armor Save, the stones take the hit instead. Lasts one scene or until the character is hit."},
  healing:{label:"Whisper Stone of Healing",table:6,row:5,description:"Every party member restores 1 Strike. Poison is also removed from anyone currently suffering from it."},
  root:{label:"Whisper Stone of the Root",table:6,row:6,description:"Moss-covered roots grab up to six nearby targets and hold them in place. Trapped targets must roll a 6 to break free."}
};

const CORRUPTED_POWERS = {
  "": {label:"— Choose Corrupted Power —", description:""},
  loathingLight:{label:"The Loathing of the Light",description:"Control light and darkness: create or remove light, animate shadows, become invisible, or create illusions."},
  howlingHeavens:{label:"The Howling of the Heavens",description:"Command weather: rain, cold, tornadoes, lightning, and other atmospheric effects. Greater scale and intensity call for more casting dice."},
  tormentTime:{label:"The Torment of Time",description:"Bend time: age or decay things, undo events, reverse wounds, or glimpse the past and future."},
  lamentLoam:{label:"The Lament of the Loam",description:"Command soil: create tunnels and holes, bury or trap foes, raise pillars of earth, cause landslides, or hide tracks."},
  grievingGreen:{label:"The Grieving of the Green",description:"Command plant life: rapid growth, thorn walls, vine bridges, roots, and other plant manipulation. Corrupted use often harms the plants afterward."},
  silenceUnmaking:{label:"The Silence of the Unmaking",description:"Unmake things taken from the natural world and made into something else. You cannot unmake a tree, but you can unmake a bridge made from it."}
};

const SAMMICHES = {
  "":{label:"— Choose Sammich —",description:"",table:0,row:0},
  mossHoagie:{label:"Moss Hoagie",table:1,row:1,description:"Ignore bad terrain and always move at normal speed. In a forest or woodsy area with moss, move twice as fast."},
  deepFriedDelight:{label:"Deep Fried Delight",table:1,row:2,description:"Once per encounter, belch as a war cry. Each enemy that fails a 4+ roll cannot take actions for that round."},
  bugSammich:{label:"Bug Sammich",table:1,row:3,description:"Gain a Boon to one type of action of your choice, except Armor or Miraculous Saves."},
  pepperPanini:{label:"Pepper Panini",table:1,row:4,description:"When you bite a creature, it burns. Failed Miraculous Saves cause it to lose 1 Strike."},
  gyro:{label:"Gyro",table:1,row:5,description:"You can turn 3 Karma into 1 Hero Die."},
  champion:{label:"Champion Sammich",table:1,row:6,description:"Gain a Boon to Miraculous Saves."},
  habenero:{label:"Hollerin' Habenero Hoagie",table:2,row:1,description:"Take one extra attack action each combat turn. Roll 1d6 when doing so; on a 1, take 1 Strike."},
  iceCream:{label:"Ice Cream Sammich",table:2,row:2,description:"Gain 3 extra Hero Dice for the day. Unused extra dice are lost at day's end."},
  egg:{label:"Egg Sammich",table:2,row:3,description:"Gain +2 Strikes for the day."},
  fruitSando:{label:"Fruit Sando",table:2,row:4,description:"Gain +1 additional Karma on failures."},
  fish:{label:"Fish Sammich",table:2,row:5,description:"You can speak with aquatic creatures."},
  pbj:{label:"Peanut Butter and Jelly",table:2,row:6,description:"Any Hero Dice you spend today are returned the next day."},
  ghostPepper:{label:"Ghost Pepper Stack",table:3,row:1,description:"Your attacks always hit, but you cannot be healed until the following day and recover no Strikes on the first night's rest after eating it."},
  mushroomMelt:{label:"Mushroom Melt",table:3,row:2,description:"Once per encounter, burp a spore cloud. For that round, enemies in melee range and enemies making ranged attacks against you attack with a Bane."},
  froggyFlatbread:{label:"Froggy Flatbread",table:3,row:3,description:"You are immune to Poison for the day."},
  sneakySlider:{label:"Sneaky Slider",table:3,row:4,description:"Gain a Boon to all sneaky and stealth tasks."},
  cloverClub:{label:"Clover Club",table:3,row:5,description:"Your crits confirm on 5+."},
  mysteryMeat:{label:"Mystery Meat",table:3,row:6,description:"Gain the effects of two random Sammiches, determined when this is eaten."}
};

const TINKER_TOOLS = {
  "":{label:"— Choose Tinker Tool —",description:"",tier:1,row:0},
  gardenTool:{label:"Common Garden Tool",tier:1,row:1,description:"Choose the type of gardening tool you receive."},
  springBoots:{label:"Spring Boots",tier:1,row:2,description:"Boots with springs. You can now jump exceptionally well."},
  ghillieSuit:{label:"Ghillie Suit",tier:1,row:3,description:"Helps you blend into one environment of your choice."},
  multiTool:{label:"Multi-Tool",tier:1,row:4,description:"Useful for many handy tasks, including cutting through metal."},
  climbingGauntlets:{label:"Climbing Gauntlets",tier:1,row:5,description:"Climbing becomes easier, and surfaces that otherwise could not be climbed now can be."},
  windupHeadlamp:{label:"Windup Headlamp",tier:1,row:6,description:"Crank it to light an area for a few minutes."},
  moonberryMarker:{label:"Moonberry Marker",tier:2,row:1,description:"A marker using moonberries as ink; its markings glow brightly in the dark."},
  extendoStaff:{label:"Extendo-Staff",tier:2,row:2,description:"A metal staff that collapses to forearm length and extends to roughly your body height."},
  grappleHookGun:{label:"Grapple Hook Gun",tier:2,row:3,description:"Launch a grappling hook to a chosen location. Includes rope."},
  firestarter:{label:"Firestarter/Lighter",tier:2,row:4,description:"Tools for starting a fire almost anywhere given a few seconds."},
  bigStank:{label:"Big Stank",tier:2,row:5,description:"A foul-smelling jar you wear at all times. Large animals spit you out if they try to eat you."},
  diverHelmet:{label:"Diver Helmet",tier:2,row:6,description:"A heavy solid metal helmet encasing the head, allowing extended time underwater."},
  glider:{label:"Glider",tier:3,row:1,description:"A backpack with collapsible wings that lets you glide long distances."},
  bigMagnet:{label:"Big Magnet",tier:3,row:2,description:"An incredibly strong magnet whose polarity can be reversed."},
  moltedCloak:{label:"Molted Cloak",tier:3,row:3,description:"A snakeskin cloak that makes snakes ignore you unless you attack them."},
  netLauncher:{label:"Net Launcher",tier:3,row:4,description:"Fires a large spider-web net. It can be reused if it is not ruined."},
  sapLauncher:{label:"Sap Launcher",tier:3,row:5,description:"Fires sticky sap that hardens over time. Includes tools for tapping trees for more sap."},
  windupDecoy:{label:"Windup Decoy",tier:3,row:6,description:"A windup decoy used to lure out or fool larger prey."}
};

const SPECIES = {
  "": { label: "— Choose Species —", abilities: "" },
  squirrel: { label: "Squirrel", abilities: `Perfect Landing — Voluntary falls cause no damage; if pushed or knocked from a harmful height, take 1 Strike only on a roll of 1.\n\nExpert Climber — Boon to climbing. Using all four limbs, you can move across walls and ceilings.\n\nCaches and Stashes — Automatically spot most hidden compartments, traps, and doors; sophisticated hiding places may require a Boon roll.` },
  mouse: { label: "Mouse", abilities: `Forager — On the party's daily Supplies roll, you always bring back something useful even if no Supply is found.\n\nTiny — Squeeze into places most cannot and gain a Boon to hiding.\n\nArt of the Sniff — Easily detect poisonous food, plants, and foul water. You can smell approaching danger and cannot normally be surprised by it.` },
  hedgehog: { label: "Hedgehog", abilities: `Sharp Defense — Once per combat, after a successful Armor Save against a melee attack, deal 1 Strike to the attacker.\n\nGrapple Free — Roll with a Boon when an enemy grapples you. On a 6, also deal 1 Strike to that enemy.` },
  otter: { label: "Otter", abilities: `Aquatic Aspirations — Boon to swimming and difficult non-combat underwater tasks; you can hold your breath for a very long time.\n\nUnderwater Movement — While fully submerged, Armor Saves roll with a Boon.\n\nNatural Engineer — Outside combat, improvise a makeshift device from surrounding objects. If the RR approves, roll 2d6 and succeed on 4+; on failure you cannot retry that scene.` },
  badger: { label: "Badger", abilities: `Honey Badger Don't Care — Boost Predator Rating by +1 die.\n\nBeefy — Gain +1 maximum Strike.\n\nStrong — Boon to strength-related tasks.`, strikeBonus: 1, predatorBonus: 1 },
  mole: { label: "Mole", abilities: `Burrow — Boon to digging; you dig much faster than most and can burrow underground.\n\nBlind Sense — Darkness does not hinder you.\n\nBig Claws — Melee attacks with your own claws roll with 1 Boon; this does not stack with melee-weapon Boons.` },
  hare: { label: "Hare", abilities: `Lucky Rabbit Feet — Miraculous Saves roll with a Boon.\n\nBig Eared — Exceptional hearing lets you detect Hollow Tongue whispers early and distinguish a Hollow Tongue from a Whisper Stone.` },
  stoat: { label: "Stoat", abilities: `Slippery — Roll 4+ to escape a bad situation such as a grapple; this takes no action, though it cannot negate a combat hit.\n\nWar Dance — Once per combat, if not surprised, add +2 Boons to the party Predator Roll. You may decide after the roll.\n\nVictory Dance — After landing a killing blow, your next attack gains an extra Boon.` }
};

const PATHS = {
  "": { label: "— Choose Adventurer Path —", strikes: 3, armor: 6, miraculous: 6, predator: 1, abilities: "" },
  shieldBearer: { label: "Warrior — Shield Bearer", strikes: 3, armor: 5, miraculous: 6, predator: 2, abilities: `Unmovable — You can only use melee attacks; they ignore all Banes. Your melee attacks cannot crit, but a rolled 6 gives +1 Karma.\n\nExtra Defense — With a shield, Armor Saves gain a Boon; a 6 deals 1 Strike to the attacker.\n\nShield Expertise — Once per scene, your shield can absorb 1 Strike from a failed Armor Save for you or a close ally.\n\nIntercept — When an adjacent ally is attacked, you may make the Armor Save for them, using your own Karma. Unlimited uses per round.\n\nStaying Alive — Hero Dice used to aid defensive maneuvers roll with a Boon.\n\nNot Today! — Once per scene as a free action, shield yourself or a close ally from all attack damage for a round, destroying the shield. Spend 5 Karma to prevent the break; if you let it break, reflect the absorbed damage to the attacker.` },
  barbarian: { label: "Warrior — Barbarian", strikes: 4, armor: 5, miraculous: 5, predator: 3, abilities: `Large Weapon — Two-handed large weapons crit on 5–6.\n\nEverything is a Weapon — Melee attacks with weapons, or other two-handed objects, roll with a Boon.\n\nToo Angry to Die — When you would lose your last Strike, roll 1d6. On a 6, ignore the hit and immediately attack back.\n\nBloodlust — After a killing blow, if another adjacent enemy has not been attacked by you this turn, make another attack. If it hits, it is automatically a crit and can confirm normally.` },
  hollowTongueHunter: { label: "Warrior — Hollow Tongue Hunter", strikes: 3, armor: 5, miraculous: 6, predator: 2, abilities: `Polearm Expert — Polearm attacks gain 1 Boon and extra reach. You can intercept an approaching enemy and make a free attack when one tries to leave; on a hit, it cannot move away.\n\nNimble — Gain an additional Boon when a Miraculous Save can be performed by jumping.\n\nJump — Leap out of reach until your next turn, then crash onto a Near or Far enemy. The landing automatically hits for a crit and counts as your movement and attack.\n\nLegendary — Against Hollow Tongues, gain a Boon to melee attacks, Armor Saves, and Miraculous Saves; add +2 Boons to the party Predator Roll.` },
  scholar: { label: "Student — Scholar", strikes: 3, armor: 6, miraculous: 5, predator: 1, abilities: `Tactician — You may use Karma on the Predator Roll, but must use your own Predator Rating for it.\n\nWhisper Stone Enthusiast — Identify Whisper Stones immediately.\n\nCollector — Start with 3 random Whisper Stones and gain a random one when visiting a Tier 2 or Tier 3 Safe Zone.\n\nI Read the Manual — When using a Whisper Stone, roll 1d6. On a 6 it is not consumed.` },
  priest: { label: "Student — Priest", strikes: 3, armor: 6, miraculous: 4, predator: 2, abilities: `I Believe in Miracles — You may perform Miracles using the core EZD6 rules.\n\nEssential Tools of the Faith — You have 2 special Whisper Stones that recharge each night with random effects. When revealed, you may reroll the effect once and keep the preferred result.\n\nFear No Evil — Gain +2 Boons to your Predator Roll against Hollow Tongues.\n\nRighteous Fury — You may always use Karma against a Hollow Tongue regardless of the Predator Roll.` },
  corrupted: { label: "Student — Corrupted", strikes: 5, armor: 6, miraculous: 6, predator: 5, abilities: `A Deal Made — Begin with one Corrupted Whisper Stone power as part of your nature, but you cannot choose Inclinations.\n\nJust a Little More — You may spend Hero Dice to reroll 1s when using your Corrupted Whisper Stone, including multiple Hero Dice.\n\nNot the Same Critter — Consumables, healing, and temporary Strikes do not affect you. At the beginning of each day, roll 2d6, keep the lowest, and heal that many Strikes.\n\nDancing with the Devil — You may use Corrupted Whisper Stone casting for Armor and Miraculous Saves.\n\nOne With the Stone — Strike loss from Corrupted Whisper Stone casting is normal rather than permanent, but you still gain Flaws.\n\nA Deal Kept — At 0 Strikes, you become a Hollow Tongue and are no longer under player control.` },
  mossMedic: { label: "Healer — Moss Medic", strikes: 3, armor: 6, miraculous: 5, predator: 1, abilities: `Bag of Moss — 6 uses; with downtime between scenes, spend 1 use to heal 1 Strike. Refill at any Safe Zone.\n\nRegrowth — Each morning roll 1d6 and refill that many uses, to a maximum of 6.\n\nAbsorption — Spend 1 use to treat Poison at any stage. The effects remain for the day, but the target wakes cured next morning.\n\nPrayer — Once per day roll 1d6; on anything but 1, heal yourself and all allies in the scene for 1 Strike. Hero Dice may be used.\n\nEdible Healing — If at least half the kit remains, you can feed the party for a night when Supplies are exhausted.` },
  combatMedic: { label: "Healer — Combat Medic", strikes: 3, armor: 6, miraculous: 6, predator: 1, abilities: `Med Kit — 6 uses, each healing 1 Strike. With a few minutes between scenes, heal as often as you have uses. Refill at Tier 2 or 3 Safe Zones.\n\nRapid Bandage — In combat, heal 1 Strike each round by using your attack action and 1 kit use.\n\nAntidote — Outside combat, cure Poison by healing the afflicted critter to full; if already full, this costs 1 kit use.\n\nSurprise Supplies — Once per enemy, trade a confirmed crit for +1 Med Kit use instead of extra damage.` },
  harvester: { label: "Healer — Harvester", strikes: 3, armor: 6, miraculous: 5, predator: 3, abilities: `Poison Kit — 6 uses. As a free action, coat a weapon for one hit; choose to inflict a Bane to all enemy actions or deal +1 Strike. Ranged misses consume the use.\n\nTools of the Trade — After encounters, harvest parts for +2 Boons to offense or defense. Harvested tools break if any die rolls 1, though the action can still succeed.\n\nBlood for Blood — Consume a harvest to heal 1 Strike for yourself or an ally.\n\nYou Don't Need That Anymore — After defeating a poison-capable enemy, consume the harvest and roll 2d6 keep lowest to refill the Poison Kit by that amount.\n\nPoison Removal — After a failed Poison Save outside combat, you may make another Poison Save for the target. Poison is removed either way and you gain +1 kit use; on failure, the target also loses 1 Strike.\n\nQuestionable Ethics — Predator Rating against other Critters is increased by 2.` },
  reptileRider: { label: "Wanderer — Reptile Rider", strikes: 3, armor: 5, miraculous: 5, predator: 2, abilities: `Trusted Companion — You have a rideable reptile with 3 Strikes. It shares your attack action and rolls reptile actions, including bites, with a Boon. Choose a special reptile ability with the RR.\n\nRanger Training — Boon to ranged attacks.\n\nMounted Calvary — While mounted and shooting, crit and crit-confirm on 5+.\n\nScary Scales — While mounted, add 1 Boon to the party Predator Rating.\n\nSaddle Bags — Each Safe Zone provides 2 additional Supplies for the journey.\n\nEvasive Maneuvers — While mounted, once per round reroll a 1 on an Armor Save without a Hero Die.\n\nBonded — When dismounted, your reptile uses your Armor and Miraculous Save ratings. You both move independently, but only one of you takes the attack action.` },
  swarmMaster: { label: "Wanderer — Swarm Master", strikes: 4, armor: 5, miraculous: 5, predator: 2, abilities: `Scrappy — Boon to melee attacks using your bare paws.\n\nThe Swarm — Control a swarm of small bugs. It has no actions, Strikes, or Armor of its own and works in tandem with you.\n\nBug-Fu — Make one extra melee attack in combat; it only hits on 6 and may confirm crits.\n\nFist of Fury — Once per combat roll 3d6 as three separate attacks. Each successful die deals 1 Strike; Karma and crit confirmation apply to each die individually.\n\nSwarm Strike — Send the swarm as a normal ranged attack: 1d6, cannot crit.\n\nTandem Troubles — Armor Saves have a Bane against cleaving and area attacks.` },
  frogTosser: { label: "Wanderer — Frog Tosser", strikes: 3, armor: 5, miraculous: 5, predator: 2, abilities: `Traveler — Choose a Boon to either melee or ranged attacks.\n\nFrog Friend — You have a pet frog that understands basic commands.\n\nThe Way of the Frog — Gain an extra Inclination or one Boon of your choice; explain how the frog grants it.\n\nPester — Throw your frog onto an enemy without using your attack action; while it stays there, that enemy attacks you with a Bane.\n\nExpose — Throw your frog onto an enemy without using your attack action; your crits and crit confirms against that target become 5+.\n\nSacrifice — After you or an ally fails an Armor Save, your frog may take the blow and deal 1 Strike to the attacker; the frog is knocked out for the rest of the scene.` }
};

const INCLINATIONS = {
  "": { label: "— Choose Inclination —", rules: "" },
  meleeTraining: { label: "Melee Training", rules: "Boon to melee attacks. This does not stack with other melee Boons." },
  rangedTraining: { label: "Ranged Training", rules: "Boon to ranged attacks. This does not stack with other ranged Boons." },
  mossPack: { label: "Moss Pack", rules: "Start the session with 6 Karma instead of 3." },
  squirrelyInspiration: { label: "Squirrely Inspiration", rules: "You can only be knocked prone by a crit, and you have a 4+ Miraculous Save when falling." },
  familiarScents: { label: "Familiar Scents", rules: "Boon to all social checks." },
  sharpInstincts: { label: "Sharp Instincts", rules: "You cannot be surprised and have a Boon to avoiding traps." },
  mossTouched: { label: "Moss Touched", rules: "Start with 2 Hero Dice instead of 1." },
  mossGiver: { label: "Moss Giver", rules: "You can share your Karma with anyone you can see." },
  lockpicking: { label: "Lockpicking", rules: "With lockpicking tools, normal mechanical locks always open. Roll 1d6 for how long it takes; lower is slower. Start with 3 lockpicks; a 1 breaks one." },
  snakeInTheGrass: { label: "Snake in the Grass", rules: "Boon to hiding and moving around unseen." },
  quickPaws: { label: "Quick Paws", rules: "Given the opportunity, steal small objects unnoticed unless you roll a 1." },
  highStrung: { label: "High Strung", rules: "After a trap triggers, roll with a Boon to avoid its consequences. If an ambush leaves you Surprised, your Armor Saves have a Boon during the first round." },
  dumpsterDiver: { label: "Dumpster Diver", rules: "You sense nearby hidden treasure, though not necessarily its exact location." },
  sneakAttack: { label: "Sneak Attack", rules: "If you successfully sneak up on an enemy, roll 3d6 for the attack. Each die is a separate hit and may crit independently." },
  motivator: { label: "Motivator", rules: "Use your combat action to give another player an additional Boon to an action of their choice." },
  chef: { label: "Chef", rules: "Start with 2 sammiches of your choice. At a Safe Zone, make a number of random sammiches equal to the Safe Zone Tier." },
  hollowTongueKiller: { label: "Hollow Tongue Killer", rules: "A rolled 6 against a Hollow Tongue counts as 2 Strikes and crits normally." },
  engineer: { label: "Engineer", rules: "Carry 2 Tinker Tools. For Tinker Tool acquisition, you may roll a Tier higher than the Safe Zone or roll twice." },
  predator: { label: "Predator", rules: "+1 Boon to your Predator Rating." },
  climber: { label: "Climber", rules: "Boon to climbing." },
  toughHide: { label: "Tough Hide", rules: "Gain +1 Strike." },
  lightSleeper: { label: "Light Sleeper", rules: "You can remain alert while sleeping, preventing sneak attacks." },
  poisonResistance: { label: "Poison Resistance", rules: "You can use Karma on Poison Saves." },
  biter: { label: "Biter", rules: "When grappled, use your Action to bite the creature holding you and deal 1 Strike without rolling." },
  meleeSpecialist: { label: "Melee Specialist", rules: "Melee attacks crit on 5+." },
  rangedSpecialist: { label: "Ranged Specialist", rules: "Ranged attacks crit on 5+." },
  possumTricks: { label: "Possum Tricks", rules: "If you are the last one standing, pretend to be dead on 5+ to trick predators into leaving you alone. Karma may be used." },
  evenTrade: { label: "Even Trade", rules: "Add a Boon to an action by adding a Bane to your next action. You cannot add another Boon this way until that Bane has been rolled." },
  allInTheVibes: { label: "All in the Vibes", rules: "Roll 4+ on 1d6 to identify a Whisper Stone. Karma may be used, but you may only roll once." },
  scarred: { label: "Scarred", rules: "Gain +1 Boon to any two action types of your choice; these Boons can stack. You are permanently unable to use Karma on your rolls." },
  strongEyes: { label: "Strong Eyes", rules: "Protect your eyes from blinding effects such as dirt or bright light on anything but a 1." },
  trainedNose: { label: "Trained Nose", rules: "With a sniff, tell whether food or a plant is poisonous." },
  combatTested: { label: "Combat Tested", rules: "Enemies need 4+ to hit you instead of the normal 3+." },
  feisty: { label: "Feisty", rules: "Gain a second melee attack that only hits on a 6, but can still crit and crit-confirm normally." },
  greensFavored: { label: "The Green's Favored", rules: "Boon to Miraculous Saves. This does not apply to Poison Saves." },
  agile: { label: "Agile", rules: "Boon to precarious actions such as balancing, catching a ledge, or staying upright on unstable ground." }
};

const PREDATOR_ABILITIES = {
  "": { label: "— Choose Predator Ability —", rules: "" },
  unpredictableCritter: { label: "Unpredictable Critter", rules: "Instead of a fixed ability, roll a random Predator Ability at the start of each encounter." },
  meatEater: { label: "Meat Eater", rules: "When you land the finishing blow with a melee attack, restore 1 Strike. Once per encounter." },
  durable: { label: "Durable", rules: "+1 temporary Strike. Can only trigger once per combat." },
  taunt: { label: "Taunt", rules: "Choose an enemy; it must attack you first with its most dangerous available attack that turn. Extra attacks may hit players directly Next to you; if none are Next to you, all attacks focus on you." },
  heightenedSenses: { label: "Heightened Senses", rules: "You can see or sniff out enemies that were otherwise hidden." },
  distract: { label: "Distract", rules: "Negate an enemy's confirmed crits for 1 Karma per confirmed crit. Free action, any number of times in the round, but only against one enemy per round." },
  rideEmCowboy: { label: "Ride 'em, Cowboy", rules: "If a larger enemy is Near, automatically climb onto it. It rolls as though grappled; your attacks against it gain a Boon. It cannot try to break free until next round. If thrown off, make an Armor Save." },
  predatorPanic: { label: "Predator Panic", rules: "When you lose the Predator Roll, double your movement and gain a Boon to avoiding grapples and ranged attacks." },
  counterAttack: { label: "Counter-Attack", rules: "Once per round, after a successful Armor Save, make a retaliatory attack." },
  defiant: { label: "Defiant", rules: "While on your last Strike, add 1 Boon to your Armor Save." },
  berserker: { label: "Berserker", rules: "While on your last Strike, all successful attacks deal 2 Strikes." },
  takingYouWithMe: { label: "Taking You With Me", rules: "At 0 Strikes, keep fighting while you keep winning the Predator Roll. If you fail that roll, you die. If combat ends while you remain at 0 Strikes, you die." },
  rally: { label: "Rally", rules: "Gain a Boon to the next Predator Roll, plus one additional Boon for each ally adjacent to you when the round ends." },
  analyzer: { label: "Analyzer", rules: "Instead of attacking, assess the enemy. You or one chosen player gains a Boon to crit confirmations. This cannot stack with itself, but can stack with other Inclinations." },
  letErRip: { label: "Let 'er Rip!", rules: "Release a pungent odor. Enemies only target you if no other target is available that round." },
  closeTheGap: { label: "Close the Gap", rules: "Close from Near or Far, including through rough terrain, for free. Your first attack against that enemy gains two Boons." },
  eyeForAnEye: { label: "Eye for an Eye", rules: "Whenever you take damage, the creature that attacked you also takes 1 damage." },
  brutalPaws: { label: "Brutal Paws", rules: "After hitting an enemy, attack another enemy Next to you. Continue once per enemy while each previous attack hits; a miss ends the chain." },
  crouchingCritter: { label: "Crouching Critter, Hidden Predator", rules: "After you fail the Predator Roll, your next successful attack is a guaranteed crit and its crit-confirm rolls have a Boon. Once per failed Predator Roll." }
};


Hooks.once("init", () => {
  console.log(`Moss and Stone | Initializing v${SYSTEM_VERSION}`);

  game.settings.register(SYSTEM_ID, "starterItemLibraryVersion", {
    name: "Starter Item Library Version",
    hint: "Tracks which Moss and Stone starter item library has been installed in this world.",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  // EZD6 does not use a random initiative roll: Adventurers act first, then enemies,
  // unless the RR rules that the Adventurers are surprised. Foundry still expects an
  // initiative value in the Combat Tracker, so expose a deterministic value through
  // actor roll data and let the normal Roll Initiative button use it.
  class MossAndStoneActor extends Actor {
    getRollData() {
      const data = super.getRollData();
      data.ezd6Initiative = this.type === "adventurer" ? 10 : this.type === "enemy" ? 5 : 0;
      return data;
    }
  }
  CONFIG.Actor.documentClass = MossAndStoneActor;
  CONFIG.Combat.initiative = CONFIG.Combat.initiative ?? {};
  CONFIG.Combat.initiative.formula = "@ezd6Initiative";
  CONFIG.Combat.initiative.decimals = 0;


  class MossAndStoneItemSheet extends ItemSheet {
    static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: [SYSTEM_ID, "sheet", "item"],
        width: 560,
        height: 560,
        resizable: true,
        submitOnChange: true,
        closeOnSubmit: false
      });
    }

    get template() { return `systems/${SYSTEM_ID}/templates/item-sheet.hbs`; }

    async getData(options = {}) {
      const context = await super.getData(options);
      context.system = this.item.system;
      context.itemTypeLabel = ({whisperStone:"Whisper Stone", sammich:"Sammich", tinkerTool:"Tinker Tool"})[this.item.type] ?? this.item.type;
      const catalog = this.item.type === "whisperStone" ? WHISPER_STONES : this.item.type === "sammich" ? SAMMICHES : TINKER_TOOLS;
      context.presetOptions = Object.entries(catalog).map(([key,data]) => ({key,label:data.label,selected:this.item.system.preset===key}));
      context.isWhisperStone = this.item.type === "whisperStone";
      context.isSammich = this.item.type === "sammich";
      context.isTinkerTool = this.item.type === "tinkerTool";
      return context;
    }

    async _updateObject(event, formData) { return this.item.update(foundry.utils.expandObject(formData)); }

    activateListeners(html) {
      super.activateListeners(html);
      if (!this.isEditable) return;
      const root = html?.[0] ?? html;
      if (!root?.querySelectorAll) return;
      root.querySelectorAll("[data-item-preset]").forEach(field => field.addEventListener("change", event => this._onPreset(event)));
      root.querySelectorAll("[data-item-post]").forEach(button => button.addEventListener("click", event => this._onPost(event)));
      root.querySelectorAll("input[name], textarea[name], select[name]").forEach(field => {
        if (!field.dataset.itemPreset) field.addEventListener("change", async event => {
          const el=event.currentTarget;
          let value=el.type === "checkbox" ? el.checked : el.value;
          if (el.type === "number") value=Number(value);
          await this.item.update({[el.name]: value});
        });
      });
    }

    async _onPreset(event) {
      const key=event.currentTarget.value;
      const catalog = this.item.type === "whisperStone" ? WHISPER_STONES : this.item.type === "sammich" ? SAMMICHES : TINKER_TOOLS;
      const data=catalog[key] ?? catalog[""];
      const updates={"system.preset":key,"system.description":data.description ?? ""};
      if (key) updates.name=data.label;
      if (this.item.type === "whisperStone" || this.item.type === "sammich") {
        updates["system.table"]=Number(data.table ?? 0); updates["system.row"]=Number(data.row ?? 0);
      }
      if (this.item.type === "tinkerTool") {
        updates["system.tier"]=Number(data.tier ?? 1); updates["system.row"]=Number(data.row ?? 0);
      }
      await this.item.update(updates);
      this.render(false);
    }

    async _onPost(event) {
      event.preventDefault();
      const status=this.item.type === "whisperStone" ? (this.item.system.drained ? "<br><strong>Drained</strong>" : "") : "";
      await ChatMessage.create({content:`<div class="moss-chat"><h3>${this.item.name}</h3><p>${this.item.system.description || "No description."}</p>${status}</div>`});
    }
  }

  class MossAndStoneActorSheet extends ActorSheet {
    static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: [SYSTEM_ID, "sheet", "actor"],
        width: 720,
        height: 800,
        resizable: true,
        submitOnChange: true,
        closeOnSubmit: false,
        tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main"}]
      });
    }

    get template() { return `systems/${SYSTEM_ID}/templates/${this.actor.type}-sheet.hbs`; }

    async getData(options = {}) {
      const context = await super.getData(options);
      context.system = this.actor.system;
      if (this.actor.type === "adventurer") {
        context.speciesOptions = Object.entries(SPECIES).map(([key, data]) => ({key, label: data.label, selected: this.actor.system.species === key}));
        context.pathOptions = Object.entries(PATHS).map(([key, data]) => ({key, label: data.label, selected: this.actor.system.path === key}));
        const sortedOptions = (collection, selectedKey) => {
          const entries = Object.entries(collection);
          const blank = entries.filter(([key]) => key === "");
          const choices = entries
            .filter(([key]) => key !== "")
            .sort(([, a], [, b]) => a.label.localeCompare(b.label, undefined, { sensitivity: "base" }));
          return [...blank, ...choices].map(([key, data]) => ({key, label: data.label, selected: selectedKey === key}));
        };
        context.inclination1Options = sortedOptions(INCLINATIONS, this.actor.system.inclination1);
        context.inclination2Options = sortedOptions(INCLINATIONS, this.actor.system.inclination2);
        context.inclination3Options = sortedOptions(INCLINATIONS, this.actor.system.inclination3);
        context.predatorAbilityOptions = sortedOptions(PREDATOR_ABILITIES, this.actor.system.predatorAbility);
        context.speciesAbilities = SPECIES[this.actor.system.species]?.abilities ?? "";
        context.pathAbilities = PATHS[this.actor.system.path]?.abilities ?? "";
        context.inclination1Rules = INCLINATIONS[this.actor.system.inclination1]?.rules ?? "";
        context.inclination2Rules = INCLINATIONS[this.actor.system.inclination2]?.rules ?? "";
        context.inclination3Rules = INCLINATIONS[this.actor.system.inclination3]?.rules ?? "";
        context.predatorAbilityRules = PREDATOR_ABILITIES[this.actor.system.predatorAbility]?.rules ?? "";
        context.inclinationsDisabled = this.actor.system.path === "corrupted";
        const effects = this.actor.system.supplyEffects ?? {};
        const effectLabels = [];
        if (effects.fatigued) effectLabels.push("Fatigued: strength tasks and melee attacks suffer 1 Bane");
        if (effects.noAmmo) effectLabels.push("No Ammo: ranged attacks are impossible");
        if (effects.damagedEquipment) effectLabels.push("Damaged Equipment: Armor Save worsened by +1");
        if (effects.brokenSpirits) effectLabels.push("Broken Spirits: choose 1 Inclination to lose until a Safe Zone");
        if (effects.faithless) effectLabels.push("Faithless: Hero Dice cannot be rolled");
        if (Number(effects.hunger ?? 0) > 0) effectLabels.push(`Hunger x${Number(effects.hunger)}: maximum Strikes reduced by ${Number(effects.hunger)}`);
        context.supplyEffectsText = effectLabels.join("\n");
        context.brokenSpiritsActive = Boolean(effects.brokenSpirits);
        const allIncsForSuppression = this._allInclinations();
        context.suppressedInclinationOptions = [{key:"",label:"— Choose lost Inclination —",selected:!this.actor.system.suppressedInclination}, ...allIncsForSuppression.map(key => ({key,label:INCLINATIONS[key]?.label ?? key,selected:this.actor.system.suppressedInclination===key}))];
        context.damagedEquipmentCritVulnerable = Boolean(this.actor.system.damagedEquipmentCritVulnerable);
        context.predatorStateLabel = this.actor.system.predatorState === "win" ? "PREDATOR" : this.actor.system.predatorState === "tie" ? "TIE" : this.actor.system.predatorState === "loss" ? "PREY" : "NOT RESOLVED";
        const activeCombatActorsForKarma = game.combat?.combatants?.map(c => c.actor).filter(Boolean) ?? [];
        const hollowTongueForKarma = activeCombatActorsForKarma.some(a => a.type === "enemy" && Boolean(a.system.isHollowTongue));
        const scarredForKarma = this._activeInclinations().includes("scarred");
        context.karmaStateLabel = scarredForKarma ? "LOCKED — SCARRED" : hollowTongueForKarma && this.actor.system.path !== "priest" ? "LOCKED — HOLLOW TONGUE" : this.actor.system.predatorState ? (this.actor.system.karmaAvailable ? "AVAILABLE" : "LOCKED") : "NORMAL";
        const predatorAbility = this.actor.system.predatorAbility;
        const predatorState = this.actor.system.predatorState;
        context.predatorAbilityStateLabel = predatorAbility === "predatorPanic" && predatorState === "loss" ? "ACTIVE — Prey trigger" : predatorAbility === "crouchingCritter" && this.actor.system.crouchingCritterPrimed ? "PRIMED — next successful attack" : this.actor.system.predatorAbilityActive ? "ACTIVE" : predatorState ? "INACTIVE" : "NOT RESOLVED";
        context.attackStyleLabel = ({melee:"Melee Weapon",largeMelee:"Large / Two-Handed Melee",natural:"Natural / Bare Paws",polearm:"Polearm",ranged:"Ranged",mountedRanged:"Mounted Ranged",swarmStrike:"Swarm Strike (Ranged)"})[this.actor.system.attackStyle] ?? "Melee Weapon";
        const autoNotes = [];
        const incs = this._activeInclinations();
        const activeCombatActors = game.combat?.combatants?.map(c => c.actor).filter(Boolean) ?? [];
        const activeEnemies = activeCombatActors.filter(a => a.type === "enemy");
        const hollowTongueActive = activeEnemies.some(a => Boolean(a.system.isHollowTongue));
        const hollowEyesActive = activeEnemies.some(a => Boolean(a.system.isHollowEyes));
        if (hollowTongueActive) autoNotes.push(this.actor.system.path === "priest" ? "Hollow Tongue present: Hero Dice are unavailable; Righteous Fury still permits Karma." : "Hollow Tongue present: Karma and Hero Dice are unavailable.");
        else if (hollowEyesActive) autoNotes.push("Hollow Eyes present: Hero Dice are unavailable.");
        if (incs.includes("scarred")) autoNotes.push(`Scarred: Karma can never be used on your rolls.${[this.actor.system.scarredBoon1,this.actor.system.scarredBoon2].filter(Boolean).length ? ` Chosen Boons: ${[this.actor.system.scarredBoon1,this.actor.system.scarredBoon2].filter(Boolean).join(", ")}.` : ""}`);
        if (incs.includes("mossPack")) autoNotes.push("Moss Pack: start each session with 6 Karma.");
        if (incs.includes("mossTouched")) autoNotes.push("Moss Touched: start each session with 2 Hero Dice.");
        if (incs.includes("hollowTongueKiller")) autoNotes.push("Hollow Tongue Killer: a kept 6 against a targeted Hollow Tongue deals 2 base Strikes and crits normally.");
        if (incs.includes("combatTested")) autoNotes.push("Combat Tested: enemies need 4+ to hit you.");
        if (incs.includes("feisty")) autoNotes.push("Feisty: melee attacks automatically trigger a second attack that only hits on a natural 6.");
        if (this.actor.system.species === "hare") autoNotes.push("Hare: Miraculous Saves automatically gain 1 Boon.");
        if (incs.includes("greensFavored")) autoNotes.push("The Green's Favored: Miraculous Saves automatically gain 1 Boon (not Poison Saves).");
        if (predatorAbility === "defiant" && this.actor.system.predatorAbilityActive && Number(this.actor.system.strikes?.value ?? 0) === 1) autoNotes.push("Defiant is active: Armor Saves automatically gain 1 Boon while on your last Strike.");
        if (predatorAbility === "berserker" && this.actor.system.predatorAbilityActive && Number(this.actor.system.strikes?.value ?? 0) === 1) autoNotes.push("Berserker is active: successful attacks deal 2 base Strikes while on your last Strike.");
        if (predatorAbility === "predatorPanic" && predatorState === "loss") autoNotes.push("Predator Panic is active: movement is doubled and you gain a Boon to avoiding grapples and ranged attacks.");
        if (predatorAbility === "crouchingCritter" && this.actor.system.crouchingCritterPrimed) autoNotes.push("Crouching Critter is primed: your next successful attack is a guaranteed crit and confirmation rolls gain a Boon.");
        const activeSammichPresets = [this.actor.system.activeSammichPreset, this.actor.system.activeSammichSecondaryPreset].filter(Boolean);
        if (activeSammichPresets.includes("champion")) autoNotes.push("Champion Sammich: Miraculous Saves automatically gain 1 Boon.");
        if (activeSammichPresets.includes("froggyFlatbread")) autoNotes.push("Froggy Flatbread: immune to Poison for the day.");
        if (activeSammichPresets.includes("cloverClub")) autoNotes.push("Clover Club: crit confirmation succeeds on 5+.");
        if (activeSammichPresets.includes("ghostPepper")) autoNotes.push("Ghost Pepper Stack: attacks always hit; healing is blocked until the following day.");
        if (this.actor.system.whisperEffects?.lucky) autoNotes.push("Whisper Stone of the Lucky: +1 Boon on checks for this scene.");
        if (this.actor.system.whisperEffects?.protection) autoNotes.push("Whisper Stone of Protection: the next failed Armor Save is absorbed by the stones.");
        context.itemSceneEffectsText = [this.actor.system.whisperEffects?.lucky ? "Lucky" : "", this.actor.system.whisperEffects?.protection ? "Protection" : ""].filter(Boolean).join(", ");
        context.hasSammichGyroAction = activeSammichPresets.includes("gyro");
        context.hasSammichHabeneroAction = activeSammichPresets.includes("habenero");
        context.automaticAbilityNotes = autoNotes.join("\n");
        context.whisperStoneItems = this.actor.items.filter(i => i.type === "whisperStone").map(i => ({id:i.id,name:i.name,description:i.system.description ?? "",identified:Boolean(i.system.identified),drained:Boolean(i.system.drained)}));
        context.sammichItems = this.actor.items.filter(i => i.type === "sammich").map(i => ({id:i.id,name:i.name,description:i.system.description ?? ""}));
        context.tinkerToolItems = this.actor.items.filter(i => i.type === "tinkerTool").map(i => ({id:i.id,name:i.name,description:i.system.description ?? "",tier:Number(i.system.tier ?? 1)}));
        context.studentStoneKnowledge = ["scholar","priest","corrupted"].includes(this.actor.system.path);
        context.tinkerToolLimit = this._activeInclinations().includes("engineer") ? 2 : 1;
        context.tinkerToolOverLimit = context.tinkerToolItems.length > context.tinkerToolLimit;
        context.isMossMedic = this.actor.system.path === "mossMedic";
        context.mossBagUses = Math.max(0, Math.min(6, Number(this.actor.system.mossBagUses ?? 6)));
        context.mossRegrowthReady = !Boolean(this.actor.system.mossRegrowthUsed);
        context.mossPrayerReady = !Boolean(this.actor.system.mossPrayerUsed);
        context.poisonCurePending = Boolean(this.actor.system.poisonCurePending);
        context.isCombatMedic = this.actor.system.path === "combatMedic";
        context.medKitUses = Math.max(0, Math.min(6, Number(this.actor.system.medKitUses ?? 6)));
        context.isHarvester = this.actor.system.path === "harvester";
        context.isShieldBearer = this.actor.system.path === "shieldBearer";
        context.isBarbarian = this.actor.system.path === "barbarian";
        context.isHollowTongueHunter = this.actor.system.path === "hollowTongueHunter";
        context.shieldIntact = this.actor.system.shieldIntact !== false;
        context.shieldExpertiseReady = !Boolean(this.actor.system.shieldExpertiseUsed);
        context.shieldNotTodayReady = !Boolean(this.actor.system.shieldNotTodayUsed);
        context.barbarianBloodlustPrimed = Boolean(this.actor.system.barbarianBloodlustPrimed);
        context.hunterAirborne = Boolean(this.actor.system.hunterAirborne);
        context.isScholar = this.actor.system.path === "scholar";
        context.scholarCollectorInitialized = Boolean(this.actor.system.scholarCollectorInitialized);
        context.scholarTacticianPrimed = Boolean(this.actor.system.scholarTacticianPrimed);
        context.hasMossPack = incs.includes("mossPack");
        context.hasMossTouched = incs.includes("mossTouched");
        context.hasChef = incs.includes("chef");
        context.hasHollowTongueKiller = incs.includes("hollowTongueKiller");
        context.hasCombatTested = incs.includes("combatTested");
        context.hasFeisty = incs.includes("feisty");
        context.hasScarred = incs.includes("scarred");
        const scarredChoices = [
          ["", "— Choose action type —"], ["melee", "Melee Attacks"], ["ranged", "Ranged Attacks"],
          ["armor", "Armor Saves"], ["miraculous", "Miraculous Saves"], ["predator", "Predator Roll"],
          ["checks", "General Checks"], ["manual", "Other / Manual"]
        ];
        context.scarredBoon1Options = scarredChoices.map(([key,label]) => ({key,label,selected:this.actor.system.scarredBoon1===key}));
        context.scarredBoon2Options = scarredChoices.map(([key,label]) => ({key,label,selected:this.actor.system.scarredBoon2===key}));
        context.chefStartingGranted = Boolean(this.actor.system.chefStartingGranted);
        context.hasInclinationTools = context.hasMossPack || context.hasMossTouched || context.hasChef || context.hasScarred;
        context.isPriest = this.actor.system.path === "priest";
        context.isCorrupted = this.actor.system.path === "corrupted";
        context.corruptedPowerOptions = Object.entries(CORRUPTED_POWERS).map(([key,data]) => ({key,label:data.label,selected:this.actor.system.corruptedPower === key}));
        context.corruptedPowerDescription = CORRUPTED_POWERS[this.actor.system.corruptedPower]?.description ?? "";
        context.corruptedPending = Boolean(this.actor.system.corruptedCastingPending);
        context.corruptedPendingOnes = Array.isArray(this.actor.system.corruptedCastingResults) ? this.actor.system.corruptedCastingResults.filter(v => Number(v) === 1).length : 0;
        context.corruptedCanReroll = context.corruptedPending && context.corruptedPendingOnes > 0 && Number(this.actor.system.heroDice ?? 0) > 0;
        context.corruptedTransformed = Boolean(this.actor.system.corruptedTransformed);
        context.priestStone1Charged = this.actor.system.priestStone1Charged !== false;
        context.priestStone2Charged = this.actor.system.priestStone2Charged !== false;
        context.priestMiracleReady = !Boolean(this.actor.system.priestMiracleUsed);
        context.priestBlessingReady = !Boolean(this.actor.system.priestMiracleBlessingUsed);
        context.isReptileRider = this.actor.system.path === "reptileRider";
        context.reptileMountedLabel = this.actor.system.reptileMounted ? "Mounted" : "Dismounted";
        context.reptileStrikesValue = Math.max(0, Number(this.actor.system.reptileStrikes?.value ?? 3));
        context.reptileStrikesMax = Math.max(1, Number(this.actor.system.reptileStrikes?.max ?? 3));
        context.isSwarmMaster = this.actor.system.path === "swarmMaster";
        context.isFrogTosser = this.actor.system.path === "frogTosser";
        context.frogWayExtraInclination = context.isFrogTosser && this.actor.system.frogWayChoice === "inclination";
        context.frogTravelerLabel = this.actor.system.frogTraveler === "melee" ? "Melee" : this.actor.system.frogTraveler === "ranged" ? "Ranged" : "Not chosen";
        context.frogWayLabel = this.actor.system.frogWayChoice === "inclination" ? "Extra Inclination" : this.actor.system.frogWayChoice === "boon" ? "Chosen Boon" : "Not chosen";
        context.frogStatusLabel = this.actor.system.frogStatus === "knockedOut" ? "Knocked Out" : this.actor.system.frogMode === "pester" ? `On ${this.actor.system.frogTargetName || "target"} — Pester` : this.actor.system.frogMode === "expose" ? `On ${this.actor.system.frogTargetName || "target"} — Expose` : "Ready";
        const currentCombatIdForSwarm = game.combat?.started ? game.combat.id : "";
        context.swarmFistReady = !currentCombatIdForSwarm || this.actor.system.swarmFistOfFuryCombatId !== currentCombatIdForSwarm;
        context.poisonKitUses = Math.max(0, Math.min(6, Number(this.actor.system.poisonKitUses ?? 6)));
        context.harvesterCoatingLabel = this.actor.system.harvesterCoating === "damage" ? "Extra Damage primed" : this.actor.system.harvesterCoating === "bane" ? "Bane primed" : "None";
        context.harvestUses = Math.max(0, Number(this.actor.system.harvestUses ?? 0));
        context.harvestedToolLabel = this.actor.system.harvestedTool === "offense" ? "Offensive Tool (+2 Boons)" : this.actor.system.harvestedTool === "defense" ? "Defensive Tool (+2 Boons)" : "None";
      }
      if (this.actor.type === "party") {
        context.predatorRoundLabel = this.actor.system.predatorRoundStatus || "No Predator Round resolved yet.";
        const combat = game.combat;
        const combatActors = combat ? Array.from(combat.combatants ?? []).map(c => c.actor).filter(Boolean) : [];
        context.hasActiveCombat = Boolean(combat && combatActors.length);
        context.combatRoster = combatActors.map(a => ({
          name: a.name,
          typeLabel: a.type === "adventurer" ? "Adventurer" : a.type === "enemy" ? "Enemy" : a.type,
          strikes: Number(a.system.strikes?.value ?? 0),
          maxStrikes: Number(a.system.strikes?.max ?? 0),
          predatorDice: Number(a.system.predatorDice ?? 1)
        }));
      }
      return context;
    }

    async _updateObject(event, formData) { return this.actor.update(foundry.utils.expandObject(formData)); }

    activateListeners(html) {
      super.activateListeners(html);
      if (!this.isEditable) return;
      const root = html?.[0] ?? html;
      if (!root?.querySelectorAll) return;

      root.querySelectorAll("[data-roll]").forEach(button => button.addEventListener("click", event => this._onRoll(event)));
      root.querySelectorAll("[data-attack]").forEach(button => button.addEventListener("click", event => this._onAttack(event)));
      root.querySelectorAll("[data-adjust]").forEach(button => button.addEventListener("click", event => this._onAdjust(event)));
      root.querySelectorAll("[data-autofill]").forEach(field => field.addEventListener("change", event => this._onAutofill(event)));
      root.querySelectorAll("[data-reference-select]").forEach(field => field.addEventListener("change", event => this._onReferenceSelect(event)));
      root.querySelectorAll("[data-flaw-action]").forEach(button => button.addEventListener("click", event => this._onFlawAction(event)));
      root.querySelectorAll("[data-party-action]").forEach(button => button.addEventListener("click", event => this._onPartyAction(event)));
      root.querySelectorAll("[data-item-use]").forEach(button => button.addEventListener("click", event => this._onItemUse(event)));
      root.querySelectorAll("[data-item-edit]").forEach(button => button.addEventListener("click", event => this.actor.items.get(event.currentTarget.dataset.itemEdit)?.sheet?.render(true)));
      root.querySelectorAll("[data-item-delete]").forEach(button => button.addEventListener("click", event => this._onItemDelete(event)));
      root.querySelectorAll("[data-clear-sammich]").forEach(button => button.addEventListener("click", event => this._clearSammich(event)));
      root.querySelectorAll("[data-sammich-action]").forEach(button => button.addEventListener("click", event => this._onSammichAction(event)));
      root.querySelectorAll("[data-clear-item-scene-effects]").forEach(button => button.addEventListener("click", event => this._clearItemSceneEffects(event)));
      root.querySelectorAll("[data-moss-medic-action]").forEach(button => button.addEventListener("click", event => this._onMossMedicAction(event)));
      root.querySelectorAll("[data-combat-medic-action]").forEach(button => button.addEventListener("click", event => this._onCombatMedicAction(event)));
      root.querySelectorAll("[data-harvester-action]").forEach(button => button.addEventListener("click", event => this._onHarvesterAction(event)));
      root.querySelectorAll("[data-warrior-action]").forEach(button => button.addEventListener("click", event => this._onWarriorAction(event)));
      root.querySelectorAll("[data-scholar-action]").forEach(button => button.addEventListener("click", event => this._onScholarAction(event)));
      root.querySelectorAll("[data-priest-action]").forEach(button => button.addEventListener("click", event => this._onPriestAction(event)));
      root.querySelectorAll("[data-corrupted-action]").forEach(button => button.addEventListener("click", event => this._onCorruptedAction(event)));
      root.querySelectorAll("[data-reptile-rider-action]").forEach(button => button.addEventListener("click", event => this._onReptileRiderAction(event)));
      root.querySelectorAll("[data-swarm-master-action]").forEach(button => button.addEventListener("click", event => this._onSwarmMasterAction(event)));
      root.querySelectorAll("[data-frog-tosser-action]").forEach(button => button.addEventListener("click", event => this._onFrogTosserAction(event)));
      root.querySelectorAll("[data-frog-config]").forEach(field => field.addEventListener("change", event => this._onFrogConfigChange(event)));
      root.querySelectorAll("[data-inclination-action]").forEach(button => button.addEventListener("click", event => this._onInclinationAction(event)));
      root.querySelectorAll("[data-scarred-config]").forEach(field => field.addEventListener("change", event => this._onScarredConfigChange(event)));
      root.querySelectorAll("input[name], textarea[name], select[name]").forEach(field => {
        if (!field.dataset.autofill && !field.dataset.referenceSelect && !field.dataset.frogConfig && !field.dataset.scarredConfig) field.addEventListener("change", event => this._onFieldChange(event));
      });
    }

    _allInclinations(actor = this.actor) {
      const s = actor.system;
      return [s.inclination1, s.inclination2, ...(s.path === "frogTosser" && s.frogWayChoice === "inclination" ? [s.inclination3] : [])].filter(Boolean);
    }

    _activeInclinations(actor = this.actor) {
      const s = actor.system;
      const suppressed = s.supplyEffects?.brokenSpirits ? String(s.suppressedInclination ?? "") : "";
      return this._allInclinations(actor).filter(i => i !== suppressed);
    }

    _scarredBoonCount(type, actor = this.actor) {
      if (!this._activeInclinations(actor).includes("scarred")) return 0;
      return [actor.system.scarredBoon1, actor.system.scarredBoon2].filter(v => v === type).length;
    }

    async _onScarredConfigChange(event) {
      event.preventDefault();
      const field = event.currentTarget;
      const path = field?.name;
      const value = field?.value ?? "";
      if (!path) return;
      const other = path.endsWith("1") ? String(this.actor.system.scarredBoon2 ?? "") : String(this.actor.system.scarredBoon1 ?? "");
      if (value && value !== "manual" && value === other) {
        ui.notifications.warn("Scarred grants Boons to two action types. Choose two different types; its Boons can stack with other sources.");
        return this.render(false);
      }
      await this.actor.update({[path]:value});
      this.render(false);
    }

    async _chooseSammichPreset(title = "Choose Sammich") {
      const options = Object.entries(SAMMICHES).filter(([k])=>k).map(([key,data])=>`<option value="${key}">${data.label}</option>`).join("");
      return foundry.applications.api.DialogV2.prompt({
        window:{title},
        content:`<p>Choose a Sammich.</p><select name="preset">${options}</select>`,
        ok:{label:"Choose",callback:(event,button,dialog)=>dialog.element.querySelector('[name="preset"]').value}
      });
    }

    async _grantSammich(actor, preset) {
      const data = SAMMICHES[preset];
      if (!data) return null;
      const [item] = await actor.createEmbeddedDocuments("Item", [{name:data.label,type:"sammich",system:{preset,description:data.description??"",table:Number(data.table??0),row:Number(data.row??0)}}]);
      return item;
    }

    async _onInclinationAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.inclinationAction;
      const incs = this._activeInclinations();
      if (action === "moss-pack-start") {
        if (!incs.includes("mossPack")) return;
        await this.actor.update({"system.karma":6});
        ui.notifications.info("Moss Pack: session starting Karma set to 6.");
        return this.render(false);
      }
      if (action === "moss-touched-start") {
        if (!incs.includes("mossTouched")) return;
        await this.actor.update({"system.heroDice":2});
        ui.notifications.info("Moss Touched: session starting Hero Dice set to 2.");
        return this.render(false);
      }
      if (action === "chef-start") {
        if (!incs.includes("chef")) return;
        if (this.actor.system.chefStartingGranted) return ui.notifications.warn("Chef starting Sammiches have already been granted.");
        const first = await this._chooseSammichPreset("Chef — Starting Sammich 1");
        if (!first) return;
        const second = await this._chooseSammichPreset("Chef — Starting Sammich 2");
        if (!second) return;
        const a = await this._grantSammich(this.actor, first);
        const b = await this._grantSammich(this.actor, second);
        await this.actor.update({"system.chefStartingGranted":true});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Chef — Starting Sammiches",`<p><strong>${this.actor.name}</strong> starts with:</p><p><strong>${a?.name ?? "Sammich"}<br>${b?.name ?? "Sammich"}</strong></p>`,`success`)});
        return this.render(false);
      }
      if (action === "chef-safezone") {
        if (!incs.includes("chef")) return;
        const party = game.actors.find(a=>a.type==="party");
        const tier = Number(party?.system?.safeZoneTier ?? 0);
        if (tier < 1 || tier > 3) return ui.notifications.warn("Set the Party sheet Safe Zone Tier to 1, 2, or 3 first.");
        const keys = Object.keys(SAMMICHES).filter(k=>k);
        const names = [];
        for (let i=0;i<tier;i++) {
          const key = keys[Math.floor(Math.random()*keys.length)];
          const item = await this._grantSammich(this.actor,key);
          if (item) names.push(item.name);
        }
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Chef — Safe Zone Sammiches",`<p>At a Tier ${tier} Safe Zone, <strong>${this.actor.name}</strong> makes ${tier} random Sammich${tier===1?"":"es"}:</p><p><strong>${names.join("<br>")}</strong></p>`,`success`)});
        return this.render(false);
      }
    }

    _heroDiceBlocked(actor = this.actor) {
      if (actor.system.supplyEffects?.faithless) return true;
      const threats = this._activeHollowThreats();
      return Boolean(threats.hollowEyes || threats.hollowTongue);
    }

    _derivedStatsFor({speciesKey=null, pathKey=null, inclination1=null, inclination2=null, inclination3=null} = {}) {
      const sys = this.actor.system;
      const species = SPECIES[speciesKey ?? sys.species] ?? SPECIES[""];
      const resolvedPathKey = pathKey ?? sys.path;
      const path = PATHS[resolvedPathKey] ?? PATHS[""];
      const thirdInclinationActive = resolvedPathKey === "frogTosser" && sys.frogWayChoice === "inclination";
      let incs = [inclination1 ?? sys.inclination1, inclination2 ?? sys.inclination2, ...(thirdInclinationActive ? [inclination3 ?? sys.inclination3] : [])].filter(Boolean);
      if (sys.supplyEffects?.brokenSpirits && sys.suppressedInclination) incs = incs.filter(i => i !== sys.suppressedInclination);
      const toughHide = incs.includes("toughHide") ? 1 : 0;
      const predatorInclination = incs.includes("predator") ? 1 : 0;
      const sammichBonus = Number(sys.sammichTempStrikeBonus ?? 0);
      const hunger = Number(sys.supplyEffects?.hunger ?? 0);
      return {
        maxStrikes: Math.max(0, Number(path.strikes ?? 3) + Number(species.strikeBonus ?? 0) + toughHide + sammichBonus - hunger),
        predatorDice: Math.max(1, Number(path.predator ?? 1) + Number(species.predatorBonus ?? 0) + predatorInclination),
        armorSave: Number(path.armor ?? 6),
        miraculousSave: Number(path.miraculous ?? 6)
      };
    }

    async _recalculateDerivedStats(overrides = {}, {resetCurrent=false} = {}) {
      const d = this._derivedStatsFor(overrides);
      const current = Number(this.actor.system.strikes?.value ?? d.maxStrikes);
      const updates = {
        "system.strikes.max": d.maxStrikes,
        "system.strikes.value": resetCurrent ? d.maxStrikes : Math.min(current, d.maxStrikes),
        "system.predatorDice": d.predatorDice
      };
      if (overrides.pathKey !== undefined || overrides.speciesKey !== undefined) {
        updates["system.armorSave"] = d.armorSave;
        updates["system.miraculousSave"] = d.miraculousSave;
      }
      await this.actor.update(updates);
    }

    async _onAutofill(event) {
      const field = event.currentTarget;
      const choice = field.value;
      const kind = field.dataset.autofill;
      const currentSpecies = kind === "species" ? choice : this.actor.system.species;
      const currentPath = kind === "path" ? choice : this.actor.system.path;
      const species = SPECIES[currentSpecies] ?? SPECIES[""];
      const path = PATHS[currentPath] ?? PATHS[""];

      const updates = {};
      if (kind === "species") updates["system.species"] = choice;
      if (kind === "path") {
        updates["system.path"] = choice;
        if (choice === "corrupted") {
          updates["system.inclination1"] = "";
          updates["system.inclination2"] = "";
          updates["system.inclination3"] = "";
        }
      }

      // Recalculate displayed combat stats from Path + Species + numerical Inclination modifiers.
      const inc1 = choice === "corrupted" && kind === "path" ? "" : this.actor.system.inclination1;
      const inc2 = choice === "corrupted" && kind === "path" ? "" : this.actor.system.inclination2;
      const derived = this._derivedStatsFor({speciesKey: currentSpecies, pathKey: currentPath, inclination1: inc1, inclination2: inc2});
      updates["system.strikes.max"] = derived.maxStrikes;
      updates["system.strikes.value"] = derived.maxStrikes;
      updates["system.armorSave"] = derived.armorSave;
      updates["system.miraculousSave"] = derived.miraculousSave;
      updates["system.predatorDice"] = derived.predatorDice;

      await this.actor.update(updates);
      this.render(false);
    }

    _mossScrollElement() {
      const root = this.element?.[0] ?? this.element;
      return root?.querySelector?.(".moss-sheet") ?? null;
    }

    _preserveScrollForNextRender() {
      const scrollTop = Number(this._mossScrollElement()?.scrollTop ?? 0);
      let hookId = null;
      hookId = Hooks.on("renderActorSheet", (app) => {
        if (app !== this) return;
        const el = this._mossScrollElement();
        if (el) el.scrollTop = scrollTop;
        if (hookId !== null) Hooks.off("renderActorSheet", hookId);
      });
      // Safety cleanup in case this sheet never renders again.
      setTimeout(() => { if (hookId !== null) Hooks.off("renderActorSheet", hookId); }, 3000);
    }

    async _onReferenceSelect(event) {
      const field = event.currentTarget;
      const path = field?.name;
      const value = field?.value ?? "";
      if (!path) return;

      // Inclination and Predator Ability choices rerender their rules text. Keep the
      // player's place on the sheet instead of jumping back to the top.
      this._preserveScrollForNextRender();

      const inclinationPaths = ["system.inclination1", "system.inclination2", "system.inclination3"];
      if (inclinationPaths.includes(path) && value) {
        const choices = [this.actor.system.inclination1, this.actor.system.inclination2, this.actor.system.inclination3];
        const idx = Number(path.slice(-1)) - 1;
        choices[idx] = value;
        const activeChoices = choices.filter((v, i) => v && (i < 2 || (this.actor.system.path === "frogTosser" && this.actor.system.frogWayChoice === "inclination")));
        if (new Set(activeChoices).size !== activeChoices.length) {
          ui.notifications.warn("Choose different Inclinations.");
          return this.render(false);
        }
      }
      const selectionUpdates = {[path]: value};
      if (inclinationPaths.includes(path) && value === "mossPack" && Number(this.actor.system.karma ?? 0) < 6) selectionUpdates["system.karma"] = 6;
      if (inclinationPaths.includes(path) && value === "mossTouched" && Number(this.actor.system.heroDice ?? 0) < 2) selectionUpdates["system.heroDice"] = 2;
      await this.actor.update(selectionUpdates);
      if (inclinationPaths.includes(path)) {
        const overrides = path.endsWith("1") ? {inclination1:value} : path.endsWith("2") ? {inclination2:value} : {inclination3:value};
        await this._recalculateDerivedStats(overrides, {resetCurrent:false});
      }
      if (path === "system.suppressedInclination") await this._recalculateDerivedStats({}, {resetCurrent:false});
      this.render(false);
    }

    _mossMedicTarget() {
      const targets = Array.from(game.user?.targets ?? []).map(t => t.actor).filter(a => a?.type === "adventurer");
      if (targets.length > 1) {
        ui.notifications.warn("Target only one Adventurer for this Moss Medic action.");
        return null;
      }
      return targets[0] ?? this.actor;
    }

    _mossMedicHealingAllowed(target) {
      if (!target || target.type !== "adventurer") return false;
      if (target.system.path === "corrupted") {
        ui.notifications.warn(`${target.name} is Corrupted and cannot be healed by normal healing.`);
        return false;
      }
      if ([target.system.activeSammichPreset, target.system.activeSammichSecondaryPreset].includes("ghostPepper")) {
        ui.notifications.warn(`${target.name} cannot be healed today because of Ghost Pepper Stack.`);
        return false;
      }
      return true;
    }

    async _onMossMedicAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.mossMedicAction;
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "mossMedic") return;

      const uses = Math.max(0, Math.min(6, Number(this.actor.system.mossBagUses ?? 6)));

      if (action === "heal") {
        if (uses <= 0) return ui.notifications.warn("The Bag of Moss is empty.");
        const target = this._mossMedicTarget();
        if (!target || !this._mossMedicHealingAllowed(target)) return;
        const current = Number(target.system.strikes?.value ?? 0);
        const max = Number(target.system.strikes?.max ?? current);
        if (current >= max) return ui.notifications.warn(`${target.name} is already at maximum Strikes.`);
        await target.update({"system.strikes.value": Math.min(max, current + 1)});
        await this.actor.update({"system.mossBagUses": uses - 1});
        await ChatMessage.create({speaker: ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Bag of Moss", `<p><strong>${this.actor.name}</strong> spends 1 Moss use to heal <strong>${target.name}</strong> for 1 Strike.</p><p>Moss remaining: <strong>${uses - 1}/6</strong>.</p>`, "success")});
        return this.render(false);
      }

      if (action === "regrowth") {
        if (this.actor.system.mossRegrowthUsed) return ui.notifications.warn("Regrowth has already been used this morning.");
        const roll = await (new Roll("1d6")).evaluate();
        const grown = Number(roll.total ?? 0);
        const newUses = Math.min(6, uses + grown);
        await this.actor.update({"system.mossBagUses":newUses,"system.mossRegrowthUsed":true});
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("Regrowth", `<p>Regrow <strong>${grown}</strong> Moss use${grown===1?"":"s"}. Bag: <strong>${uses}/6 → ${newUses}/6</strong>.</p><p><small>Regrowth may be used once each morning.</small></p>`, "success")});
        return this.render(false);
      }

      if (action === "absorption") {
        if (uses <= 0) return ui.notifications.warn("The Bag of Moss is empty.");
        const target = this._mossMedicTarget();
        if (!target) return;
        const poisoned = Boolean(target.system.poisonActive) || Boolean(target.system.poisonTerminal) || Number(target.system.poisonMarks ?? 0) > 0;
        if (!poisoned) return ui.notifications.warn(`${target.name} is not currently Poisoned.`);
        await target.update({"system.poisonCurePending":true});
        await this.actor.update({"system.mossBagUses":uses-1});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Absorption", `<p><strong>${this.actor.name}</strong> spends 1 Moss use to treat <strong>${target.name}</strong>'s Poison.</p><p>The Poison remains active for the rest of the day, but will be completely cured after the next night's sleep.</p><p>Moss remaining: <strong>${uses-1}/6</strong>.</p>`, "success")});
        return this.render(false);
      }

      if (action === "prayer") {
        if (this.actor.system.mossPrayerUsed) return ui.notifications.warn("Prayer has already been used today.");
        const roll = await (new Roll("1d6")).evaluate();
        const result = Number(roll.total ?? 0);
        await this.actor.update({"system.mossPrayerUsed":true});
        let healed = 0, blocked = 0;
        const actors = [];
        const add = a => { if (a?.type === "adventurer" && !actors.some(x => x.uuid === a.uuid)) actors.push(a); };
        add(this.actor);
        for (const token of canvas?.scene?.tokens ?? []) add(token.actor);
        if (result !== 1) {
          for (const target of actors) {
            if (target.system.path === "corrupted" || [target.system.activeSammichPreset,target.system.activeSammichSecondaryPreset].includes("ghostPepper")) { blocked++; continue; }
            const current = Number(target.system.strikes?.value ?? 0);
            const max = Number(target.system.strikes?.max ?? current);
            if (current < max) { await target.update({"system.strikes.value":Math.min(max,current+1)}); healed++; }
          }
        }
        const body = result === 1
          ? `<p>Prayer roll: <strong>1</strong> — the prayer does not heal anyone.</p><p><small>A Hero Die may still be used to reroll this result manually.</small></p>`
          : `<p>Prayer roll: <strong>${result}</strong> — success.</p><p><strong>${healed}</strong> Adventurer${healed===1?"":"s"} in the current scene restored 1 Strike.${blocked ? ` ${blocked} healing effect${blocked===1?" was":"s were"} blocked by Path/item restrictions.` : ""}</p>`;
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("Prayer to the Green Voice", body, result===1?"danger":"success")});
        return this.render(false);
      }

      if (action === "edible") {
        if (uses < 3) return ui.notifications.warn("Edible Healing requires at least half of the 6-use Moss kit (3+ uses).");
        const party = game.actors?.find(a => a.type === "party");
        if (party && Number(party.system.supplies?.value ?? 0) > 0) return ui.notifications.warn("The party still has Supplies. Edible Healing is for a night when Supplies are exhausted.");
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Edible Healing", `<p><strong>${this.actor.name}</strong> has at least half of the Moss kit remaining (${uses}/6) and can feed the party for the night while Supplies are exhausted.</p><p><small>The rules do not specify that Moss uses are spent for this ability, so the system does not consume the kit automatically.</small></p>`, "success")});
      }
    }

    _combatMedicTarget() {
      const targets = Array.from(game.user?.targets ?? []).map(t => t.actor).filter(a => a?.type === "adventurer");
      if (targets.length > 1) {
        ui.notifications.warn("Target only one Adventurer for this Combat Medic action.");
        return null;
      }
      return targets[0] ?? this.actor;
    }

    _combatMedicHealingAllowed(target) {
      if (!target || target.type !== "adventurer") return false;
      if (target.system.path === "corrupted") {
        ui.notifications.warn(`${target.name} is Corrupted and cannot be healed by normal healing.`);
        return false;
      }
      if ([target.system.activeSammichPreset, target.system.activeSammichSecondaryPreset].includes("ghostPepper")) {
        ui.notifications.warn(`${target.name} cannot be healed today because of Ghost Pepper Stack.`);
        return false;
      }
      return true;
    }

    async _onCombatMedicAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.combatMedicAction;
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "combatMedic") return;

      const uses = Math.max(0, Math.min(6, Number(this.actor.system.medKitUses ?? 6)));

      if (action === "heal") {
        if (uses <= 0) return ui.notifications.warn("The Med Kit is empty.");
        const target = this._combatMedicTarget();
        if (!target || !this._combatMedicHealingAllowed(target)) return;
        const current = Number(target.system.strikes?.value ?? 0);
        const max = Number(target.system.strikes?.max ?? current);
        const missing = Math.max(0, max - current);
        if (missing <= 0) return ui.notifications.warn(`${target.name} is already at maximum Strikes.`);
        const maxSpend = Math.min(uses, missing);
        let spend = 1;
        if (maxSpend > 1) {
          spend = await foundry.applications.api.DialogV2.prompt({
            window: {title: "Heal with Med Kit"},
            content: `<div style="text-align:center"><p>How many Strikes should <strong>${target.name}</strong> recover?</p><input type="number" name="uses" value="${maxSpend}" min="1" max="${maxSpend}" style="width:70px;text-align:center"></div>`,
            ok: {label:"Heal", callback:(event, button, dialog) => Number(dialog.element.querySelector('[name="uses"]').value)}
          });
          if (!spend) return;
          spend = Math.max(1, Math.min(maxSpend, Number(spend) || 1));
        }
        await target.update({"system.strikes.value": Math.min(max, current + spend)});
        await this.actor.update({"system.medKitUses": uses - spend});
        await ChatMessage.create({speaker: ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Med Kit", `<p><strong>${this.actor.name}</strong> spends <strong>${spend}</strong> Med Kit use${spend===1?"":"s"} to heal <strong>${target.name}</strong> for ${spend} Strike${spend===1?"":"s"}.</p><p>Med Kit remaining: <strong>${uses-spend}/6</strong>.</p>`, "success")});
        return this.render(false);
      }

      if (action === "rapid") {
        const combat = game.combat;
        if (!combat?.started) return ui.notifications.warn("Rapid Bandage can only be used during an active combat encounter.");
        if (uses <= 0) return ui.notifications.warn("The Med Kit is empty.");
        const roundKey = `${combat.id}:${Number(combat.round ?? 0)}`;
        if (this.actor.system.combatMedicRapidBandageRound === roundKey) return ui.notifications.warn("Rapid Bandage has already been used this round.");
        const target = this._combatMedicTarget();
        if (!target || !this._combatMedicHealingAllowed(target)) return;
        const current = Number(target.system.strikes?.value ?? 0);
        const max = Number(target.system.strikes?.max ?? current);
        if (current >= max) return ui.notifications.warn(`${target.name} is already at maximum Strikes.`);
        await target.update({"system.strikes.value": Math.min(max, current + 1)});
        await this.actor.update({"system.medKitUses": uses - 1, "system.combatMedicRapidBandageRound": roundKey});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Rapid Bandage", `<p><strong>${this.actor.name}</strong> uses their attack action and 1 Med Kit use to heal <strong>${target.name}</strong> for 1 Strike.</p><p>Med Kit remaining: <strong>${uses-1}/6</strong>. Rapid Bandage is now used for this round.</p>`, "success")});
        return this.render(false);
      }

      if (action === "antidote") {
        if (game.combat?.started) return ui.notifications.warn("Antidote can only be used outside combat.");
        if (uses <= 0) return ui.notifications.warn("The Med Kit is empty.");
        const target = this._combatMedicTarget();
        if (!target || !this._combatMedicHealingAllowed(target)) return;
        if (target.system.poisonTerminal) return ui.notifications.warn(`${target.name} has Terminal Poison and can no longer be cured.`);
        const poisoned = Boolean(target.system.poisonActive) || Number(target.system.poisonMarks ?? 0) > 0;
        if (!poisoned) return ui.notifications.warn(`${target.name} is not currently Poisoned.`);
        const current = Number(target.system.strikes?.value ?? 0);
        const max = Number(target.system.strikes?.max ?? current);
        const cost = Math.max(1, max - current);
        if (cost > uses) return ui.notifications.warn(`Antidote requires ${cost} Med Kit uses to heal ${target.name} to full, but only ${uses} remain.`);
        await target.update({"system.strikes.value":max,"system.poisonMarks":0,"system.poisonActive":false,"system.poisonTerminal":false,"system.poisonCurePending":false});
        await this.actor.update({"system.medKitUses":uses-cost});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Antidote", `<p><strong>${this.actor.name}</strong> spends <strong>${cost}</strong> Med Kit use${cost===1?"":"s"}, heals <strong>${target.name}</strong> to full Strikes, and completely cures their Poison.</p><p>Med Kit remaining: <strong>${uses-cost}/6</strong>.</p>`, "success")});
        return this.render(false);
      }

      if (action === "surprise") {
        if (uses >= 6) return ui.notifications.warn("The Med Kit is already full.");
        const targetTokens = Array.from(game.user?.targets ?? []).filter(t => t.actor?.type === "enemy");
        if (targetTokens.length !== 1) return ui.notifications.warn("Target exactly one enemy whose confirmed crit you are trading for Surprise Supplies.");
        const targetToken = targetTokens[0];
        const key = targetToken.document?.uuid ?? targetToken.actor?.uuid ?? targetToken.id;
        const used = Array.isArray(this.actor.system.combatMedicSurpriseUsedEnemies) ? [...this.actor.system.combatMedicSurpriseUsedEnemies] : [];
        if (used.includes(key)) return ui.notifications.warn(`Surprise Supplies has already been used against ${targetToken.name} this encounter.`);
        used.push(key);
        await this.actor.update({"system.medKitUses":Math.min(6,uses+1),"system.combatMedicSurpriseUsedEnemies":used});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Surprise Supplies", `<p><strong>${this.actor.name}</strong> trades a confirmed crit against <strong>${targetToken.name}</strong> for <strong>+1 Med Kit use</strong> instead of the extra damage.</p><p>Med Kit: <strong>${uses}/6 → ${Math.min(6,uses+1)}/6</strong>.</p><p><small>This can only be used once per enemy.</small></p>`, "success")});
        return this.render(false);
      }
    }

    async _swarmMasterArmorSaveWithBane() {
      const s = this.actor.system;
      let boons = 0;
      const notes = ["Tandem Troubles: +1 Bane against cleaving/area attacks"];
      if (s.predatorAbility === "defiant" && s.predatorAbilityActive && Number(s.strikes?.value ?? 0) === 1) {
        boons += 1;
        notes.push("Defiant: +1 Boon");
      }
      if (s.whisperEffects?.lucky) { boons += 1; notes.push("Whisper Stone of the Lucky: +1 Boon"); }
      const outcome = await this._rollTargetPool("Armor Save — Area/Cleave", Number(s.armorSave ?? 6), boons, 1, notes);
      if (!outcome?.success && s.whisperEffects?.protection) {
        await this.actor.update({"system.whisperEffects.protection": false});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<div class="moss-chat"><h3>Whisper Stone of Protection</h3><p>${this.actor.name}'s Armor Save failed, but the orbiting stones take the hit instead. The Protection effect is now spent.</p></div>`});
        this.render(false);
      }
      return outcome;
    }

    async _swarmMasterBugFu() {
      const target = Math.min(6, Math.max(2, Number(this.actor.system.attackTarget ?? 3)));
      const roll = await (new Roll("1d6")).evaluate();
      const result = Number(roll.total);
      const hit = result === 6;
      let strikes = hit ? 1 : 0;
      const confirms = [];
      if (hit) {
        let confirming = true;
        while (confirming) {
          const r = await (new Roll("1d6")).evaluate();
          const value = Number(r.total);
          confirms.push(value);
          if (value === 6) strikes += 1;
          else confirming = false;
        }
      }
      const critText = hit ? `<br><strong>CRIT!</strong>${confirms.length ? ` Confirmation rolls: ${confirms.join(", ")}.` : ""}` : "";
      const damageText = hit ? `<br>Damage: <strong>${strikes} Strike${strikes===1?"":"s"}</strong>` : "";
      await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:`<strong>${this.actor.name} — Bug-Fu</strong><br>Extra melee attack; only a natural 6 hits.<br>Rolled <strong>${result}</strong> — <strong>${hit?"HIT":"MISS"}</strong>${critText}${damageText}<br><small>Current normal Attack TN is ${target}+, but Bug-Fu specifically only hits on a 6.</small>`});
    }

    async _swarmMasterSwarmStrike() {
      const s = this.actor.system;
      if (s.supplyEffects?.noAmmo) {
        // Swarm Strike uses the swarm, not ammunition; intentionally ignore No Ammo.
      }
      const target = Math.min(6, Math.max(2, Number(s.attackTarget ?? 3)));
      let boons = 0, banes = 0;
      const notes = ["Swarm Strike: cannot crit"];
      if (s.whisperEffects?.lucky) { boons += 1; notes.push("Whisper Stone of the Lucky: +1 Boon"); }
      if (s.poisonActive) { banes += 1; notes.push("Poison: +1 Bane"); }
      const net = boons - banes;
      const diceCount = 1 + Math.abs(net);
      const keepLow = net < 0;
      const formula = diceCount > 1 ? `${diceCount}d6${keepLow?"kl1":"kh1"}` : "1d6";
      const roll = await (new Roll(formula)).evaluate();
      const results = roll.dice[0]?.results?.map(r=>r.result) ?? [roll.total];
      const kept = keepLow ? Math.min(...results) : Math.max(...results);
      let hit = kept === 1 ? false : (kept === 6 ? true : kept >= target);
      if (this._activeSammichPresets().includes("ghostPepper")) { hit = true; notes.push("Ghost Pepper Stack: attack automatically hits"); }
      const poolText = net===0?"1d6":net>0?`${diceCount}d6 keep highest`:`${diceCount}d6 keep lowest`;
      await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:`<strong>${this.actor.name} — Swarm Strike</strong> (target ${target}+)<br>${poolText}; kept <strong>${kept}</strong><br><strong>${hit?"HIT":"MISS"}</strong>${hit?"<br>Damage: <strong>1 Strike</strong>":""}<br><small>${notes.join(" • ")}</small>`});
    }

    async _swarmMasterFistOfFury() {
      const combat = game.combat;
      if (!combat?.started) return ui.notifications.warn("Fist of Fury can only be used during an active combat encounter.");
      if (this.actor.system.swarmFistOfFuryCombatId === combat.id) return ui.notifications.warn("Fist of Fury has already been used in this combat.");
      const target = Math.min(6, Math.max(2, Number(this.actor.system.attackTarget ?? 3)));
      const roll = await (new Roll("3d6")).evaluate();
      const results = roll.dice[0]?.results?.map(r=>r.result) ?? [];
      let totalStrikes = 0;
      const rows = [];
      for (let i=0;i<results.length;i++) {
        const die = Number(results[i]);
        const hit = die === 1 ? false : (die === 6 ? true : die >= target);
        let strikes = hit ? 1 : 0;
        const confirms = [];
        if (hit && die === 6) {
          let confirming = true;
          while (confirming) {
            const r = await (new Roll("1d6")).evaluate();
            const value = Number(r.total);
            confirms.push(value);
            if (value === 6) strikes += 1;
            else confirming = false;
          }
        }
        totalStrikes += strikes;
        rows.push(`<li>Attack ${i+1}: <strong>${die}</strong> — <strong>${hit?"HIT":"MISS"}</strong>${hit?` — ${strikes} Strike${strikes===1?"":"s"}`:""}${confirms.length?` (confirmations: ${confirms.join(", ")})`:""}</li>`);
      }
      await this.actor.update({"system.swarmFistOfFuryCombatId": combat.id});
      await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:mossCard("Fist of Fury",`<p>Three independent attacks against TN <strong>${target}+</strong>.</p><ul>${rows.join("")}</ul><p><strong>Total Strikes: ${totalStrikes}</strong></p><p><small>Karma may be applied to the individual attack dice manually. Fist of Fury is now used for this combat.</small></p>`,totalStrikes?"success":"danger")});
      this.render(false);
    }

    async _onFrogConfigChange(event) {
      event.preventDefault();
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "frogTosser") return;
      this._preserveScrollForNextRender();
      const field = event.currentTarget;
      const path = field?.name;
      const value = field?.value ?? "";
      if (!path) return;
      const updates = {[path]: value};
      if (path === "system.frogWayChoice") {
        if (value !== "inclination") updates["system.inclination3"] = "";
        if (value !== "boon") updates["system.frogWayBoon"] = "";
      }
      await this.actor.update(updates);
      if (path === "system.frogWayChoice") await this._recalculateDerivedStats({}, {resetCurrent:false});
      this.render(false);
    }

    _frogEnemyTargetToken() {
      const targets = Array.from(game.user?.targets ?? []).filter(t => t.actor?.type === "enemy");
      if (targets.length !== 1) {
        ui.notifications.warn("Target exactly one enemy for this Frog Tosser action.");
        return null;
      }
      return targets[0];
    }

    async _clearFrogAttachment({setReady=true} = {}) {
      const s = this.actor.system;
      if (s.frogMode === "pester" && s.frogTargetUuid) {
        try {
          const oldTarget = await fromUuid(s.frogTargetUuid);
          if (oldTarget?.type === "enemy" && oldTarget.system?.frogPesterOwnerUuid === this.actor.uuid) {
            await oldTarget.update({"system.frogPesterOwnerUuid":"","system.frogPesterOwnerName":""});
          }
        } catch (err) { console.warn("Moss & Stone | Could not clear prior Frog Pester target", err); }
      }
      const updates = {"system.frogMode":"","system.frogTargetUuid":"","system.frogTargetName":""};
      if (setReady) updates["system.frogStatus"] = "ready";
      await this.actor.update(updates);
    }

    _randomWhisperPreset() {
      const keys = Object.keys(WHISPER_STONES).filter(k => k);
      return keys[Math.floor(Math.random() * keys.length)] ?? "";
    }

    async _priestChooseRandomWhisperEffect(originalPreset = "") {
      const first = originalPreset || this._randomWhisperPreset();
      const firstData = WHISPER_STONES[first] ?? WHISPER_STONES[""];
      const reroll = await Dialog.confirm({
        title: "Essential Tools of the Faith",
        content: `<div class="moss-chat"><p>The stone reveals <strong>${firstData.label}</strong>.</p><p>${firstData.description}</p><p><strong>Reroll this effect once?</strong></p></div>`,
        yes: () => true,
        no: () => false,
        defaultYes: false
      });
      if (!reroll) return first;
      const second = this._randomWhisperPreset();
      const secondData = WHISPER_STONES[second] ?? WHISPER_STONES[""];
      const chooseSecond = await Dialog.confirm({
        title: "Keep the Preferred Effect",
        content: `<div class="moss-chat"><p><strong>Original:</strong> ${firstData.label}</p><p><strong>Reroll:</strong> ${secondData.label}</p><p>Use the <strong>rerolled</strong> effect? Choose No to keep the original.</p></div>`,
        yes: () => true,
        no: () => false,
        defaultYes: true
      });
      return chooseSecond ? second : first;
    }

    async _grantRandomWhisperStones(actor, count = 1) {
      const keys = Object.keys(WHISPER_STONES).filter(k => k);
      const docs = [];
      for (let i=0;i<count;i++) {
        const key = keys[Math.floor(Math.random()*keys.length)];
        const data = WHISPER_STONES[key];
        docs.push({name:data.label,type:"whisperStone",system:{preset:key,description:data.description??"",identified:true,drained:false,table:Number(data.table??0),row:Number(data.row??0)}});
      }
      if (docs.length) await actor.createEmbeddedDocuments("Item", docs);
      return docs.map(d=>d.name);
    }

    async _onScholarAction(event) {
      event.preventDefault();
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "scholar") return;
      const action = event.currentTarget.dataset.scholarAction;
      if (action === "collector-start") {
        if (this.actor.system.scholarCollectorInitialized) return ui.notifications.warn("Collector starting Whisper Stones have already been granted.");
        const names = await this._grantRandomWhisperStones(this.actor, 3);
        await this.actor.update({"system.scholarCollectorInitialized":true});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Collector — Starting Stones",`<p>${this.actor.name} gains 3 random Whisper Stones:</p><p><strong>${names.join("<br>")}</strong></p>`,"success")});
        return this.render(false);
      }
      if (action === "collector-safezone") {
        const party = game.actors.find(a=>a.type==="party");
        const tier = Number(party?.system?.safeZoneTier ?? 0);
        if (tier < 2) return ui.notifications.warn("Collector grants a random Whisper Stone only at a Tier 2 or Tier 3 Safe Zone.");
        const names = await this._grantRandomWhisperStones(this.actor, 1);
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Collector — Safe Zone",`<p>${this.actor.name} acquires a random Whisper Stone at this Tier ${tier} Safe Zone:</p><p><strong>${names[0]}</strong></p><p><small>Use this once per Safe Zone visit.</small></p>`,"success")});
        return this.render(false);
      }
      if (action === "tactician") {
        const next = !Boolean(this.actor.system.scholarTacticianPrimed);
        await this.actor.update({"system.scholarTacticianPrimed":next});
        ui.notifications.info(next ? "Tactician primed: the next Predator Round will use this Scholar's Predator Rating and may spend Karma." : "Tactician cancelled.");
        return this.render(false);
      }
    }

    async _onPriestAction(event) {
      event.preventDefault();
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "priest") return;
      const action = event.currentTarget.dataset.priestAction;
      const s = this.actor.system;

      if (action === "stone-1" || action === "stone-2") {
        const idx = action.endsWith("1") ? 1 : 2;
        const chargedPath = `priestStone${idx}Charged`;
        if (s[chargedPath] === false) return ui.notifications.warn(`Faith Stone ${idx} has already been used today. It recharges after a night's rest.`);
        const chosen = await this._priestChooseRandomWhisperEffect();
        const data = WHISPER_STONES[chosen] ?? WHISPER_STONES[""];
        const automated = await this._applyWhisperStoneEffect(chosen);
        await this.actor.update({[`system.${chargedPath}`]: false});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard(`Essential Tools of the Faith — Stone ${idx}`, `<p><strong>${data.label}</strong></p><p>${data.description}</p>${automated ? `<p><strong>Automated:</strong> ${automated}</p>` : ""}<p><small>This faith stone is spent until the next night's rest.</small></p>`, "success")});
        return this.render(false);
      }

      if (action === "miracle") {
        if (s.priestMiracleUsed) return ui.notifications.warn("A miracle has already been petitioned for this scene. The core rules allow only one miracle per scene/situation.");
        const prayerDice = Math.max(1, Math.min(3, Number(s.priestMiracleUrgency ?? 1)));
        const aloofDice = Math.max(1, Math.min(12, Number(s.priestMiracleAloofness ?? 3)));
        const prayer = await (new Roll(`${prayerDice}d6`)).evaluate();
        const aloof = await (new Roll(`${aloofDice}d6`)).evaluate();
        const prayerResults = prayer.dice[0]?.results?.map(r => Number(r.result)) ?? [Number(prayer.total)];
        const aloofResults = aloof.dice[0]?.results?.map(r => Number(r.result)) ?? [Number(aloof.total)];
        const prayerHigh = Math.max(...prayerResults), aloofHigh = Math.max(...aloofResults);
        const hasOne = prayerResults.includes(1);
        const success = !hasOne && prayerHigh >= aloofHigh;
        await this.actor.update({
          "system.priestMiracleUsed": true,
          "system.priestMiracleLastPrayer": prayerResults,
          "system.priestMiracleLastAloofness": aloofResults,
          "system.priestMiracleLastAloofnessHigh": aloofHigh
        });
        const request = String(s.priestMiracleRequest ?? "").trim() || "No prayer request entered.";
        await prayer.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("I Believe in Miracles", `<p><strong>Prayer:</strong> ${request.replace(/\n/g,"<br>")}</p><p>Urgency: <strong>${prayerDice}d6</strong> → ${prayerResults.join(", ")} (high ${prayerHigh})</p><p>Aloofness: <strong>${aloofDice}d6</strong> → ${aloofResults.join(", ")} (high ${aloofHigh})</p><p class="moss-result ${success ? "success" : "failure"}">${success ? "MIRACLE PETITION SUCCEEDS" : "MIRACLE PETITION FAILS"}</p>${hasOne ? "<p><strong>A prayer die rolled 1, which automatically fails the petition.</strong></p>" : ""}<p><small>No Karma may be used. A Hero Die may reroll one prayer die. A sufficient offering may allow the once-per-day Blessing Reroll of all prayer dice. Miracles cannot cause harm or damage; the RR has final approval.</small></p>`, success ? "success" : "danger")});
        return this.render(false);
      }

      if (action === "blessing-reroll") {
        if (s.priestMiracleBlessingUsed) return ui.notifications.warn("The once-per-day miracle Blessing Reroll has already been used.");
        const previous = Array.isArray(s.priestMiracleLastPrayer) ? s.priestMiracleLastPrayer : [];
        const aloofHigh = Number(s.priestMiracleLastAloofnessHigh ?? 0);
        if (!previous.length || !aloofHigh) return ui.notifications.warn("Make a miracle petition first. The Blessing rerolls all prayer dice from that petition.");
        const prayerDice = previous.length;
        const reroll = await (new Roll(`${prayerDice}d6`)).evaluate();
        const results = reroll.dice[0]?.results?.map(r => Number(r.result)) ?? [Number(reroll.total)];
        const high = Math.max(...results);
        const hasOne = results.includes(1);
        const success = !hasOne && high >= aloofHigh;
        await this.actor.update({"system.priestMiracleBlessingUsed": true,"system.priestMiracleLastPrayer":results});
        await reroll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("Miracle — Blessed Offering Reroll", `<p>Prayer dice rerolled: ${results.join(", ")} (high <strong>${high}</strong>)</p><p>Aloofness to equal or beat: <strong>${aloofHigh}</strong></p><p class="moss-result ${success ? "success" : "failure"}">${success ? "MIRACLE PETITION SUCCEEDS" : "MIRACLE PETITION FAILS"}</p>${hasOne ? "<p>A prayer die rolled 1, automatically failing the petition.</p>" : ""}<p><small>This once-per-day reroll assumes the RR approved the offering as sufficient.</small></p>`, success ? "success" : "danger")});
        return this.render(false);
      }
    }

    _corruptedPowerLabel() {
      return CORRUPTED_POWERS[this.actor.system.corruptedPower]?.label || "Corrupted Whisper Stone";
    }

    async _corruptedStartCast({purpose="casting"} = {}) {
      if (this.actor.system.corruptedTransformed) return ui.notifications.warn(`${this.actor.name} has become a Hollow Tongue and is no longer under player control.`);
      const power = this.actor.system.corruptedPower;
      if (!power) return ui.notifications.warn("Choose your Corrupted Whisper Stone power first.");
      if (this.actor.system.corruptedCastingPending) return ui.notifications.warn("Resolve the current Corrupted casting before starting another.");
      const dice = Math.max(1, Math.min(12, Number(this.actor.system.corruptedCastingDice ?? 1) || 1));
      const intent = String(this.actor.system.corruptedCastingIntent ?? "").trim();
      const roll = await (new Roll(`${dice}d6`)).evaluate();
      const results = roll.dice[0]?.results?.map(r => Number(r.result)) ?? [];
      const ones = results.filter(v => v === 1).length;
      await this.actor.update({
        "system.corruptedCastingPending": true,
        "system.corruptedCastingResults": results,
        "system.corruptedCastingPurpose": purpose,
        "system.corruptedCastingPendingIntent": intent
      });
      const purposeText = purpose === "armor" ? "Dancing with the Devil — Armor Save" : purpose === "miraculous" ? "Dancing with the Devil — Miraculous Save" : "Corrupted Whisper Stone Casting";
      const autoText = purpose === "armor" ? "The Armor Save succeeds through corrupted power." : purpose === "miraculous" ? "The Miraculous Save succeeds through corrupted power." : "The intended corrupted effect works.";
      await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard(purposeText, `<p><strong>${this._corruptedPowerLabel()}</strong></p>${intent ? `<p><strong>Intent:</strong> ${intent.replace(/\n/g,"<br>")}</p>` : ""}<p>${autoText}</p><p>Casting dice: <strong>${results.join(", ") || roll.total}</strong></p><p>${ones ? `<strong>${ones} die${ones===1?"":"s"} rolled 1.</strong> You may spend Hero Dice to reroll individual 1s before resolving.` : "No 1s were rolled. Resolve the casting with no corruption damage."}</p><small>The Corrupted Path overrides the normal restriction and may spend Hero Dice specifically to reroll 1s from this casting. Karma cannot be used.</small>`, ones ? "danger" : "success")});
      this.render(false);
    }

    async _corruptedRerollOne() {
      const results = Array.isArray(this.actor.system.corruptedCastingResults) ? [...this.actor.system.corruptedCastingResults].map(Number) : [];
      const idx = results.findIndex(v => v === 1);
      if (idx < 0) return ui.notifications.warn("There are no 1s left to reroll.");
      if (this._heroDiceBlocked()) return ui.notifications.warn("Hero Dice cannot be rolled right now (Faithless or Hollow threat restriction).");
      const hero = Number(this.actor.system.heroDice ?? 0);
      if (hero < 1) return ui.notifications.warn("You have no Hero Dice to spend.");
      const roll = await (new Roll("1d6")).evaluate();
      results[idx] = Number(roll.total);
      await this.actor.update({"system.heroDice":hero-1,"system.corruptedCastingResults":results});
      const remaining = results.filter(v => v === 1).length;
      await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("Just a Little More", `<p>Spend <strong>1 Hero Die</strong> to reroll one corrupted casting result of 1.</p><p>New result: <strong>${roll.total}</strong></p><p>Current pool: <strong>${results.join(", ")}</strong></p><p>${remaining ? `${remaining} result${remaining===1?" remains":"s remain"} at 1.` : "No 1s remain."}</p>`, remaining ? "danger" : "success")});
      this.render(false);
    }

    async _corruptedResolveCast() {
      if (!this.actor.system.corruptedCastingPending) return ui.notifications.warn("There is no Corrupted casting waiting to be resolved.");
      const results = Array.isArray(this.actor.system.corruptedCastingResults) ? this.actor.system.corruptedCastingResults.map(Number) : [];
      const ones = results.filter(v => v === 1).length;
      const old = Number(this.actor.system.strikes?.value ?? 0);
      const next = Math.max(0, old - ones);
      const flawCount = Number(this.actor.system.corruptedFlawCount ?? 0) + ones;
      const transformed = next <= 0 && ones > 0;
      const updates = {
        "system.strikes.value": next,
        "system.corruptedFlawCount": flawCount,
        "system.corruptedCastingPending": false,
        "system.corruptedCastingResults": [],
        "system.corruptedCastingPurpose": "",
        "system.corruptedCastingPendingIntent": ""
      };
      if (transformed) updates["system.corruptedTransformed"] = true;
      await this.actor.update(updates);
      const damageText = ones ? `<p><strong>One With the Stone:</strong> ${this.actor.name} takes <strong>${ones} Strike${ones===1?"":"s"}</strong> as normal damage and gains <strong>${ones} additional Flaw${ones===1?"":"s"}</strong>.</p><p>The RR also introduces <strong>${ones} complication${ones===1?"":"s"}</strong> affecting allies, enemies, or the environment rather than directly harming the caster.</p>` : `<p>No 1s remain. The casting resolves without corruption damage or a new Flaw.</p>`;
      const transformText = transformed ? `<p class="moss-result failure"><strong>A DEAL KEPT:</strong> ${this.actor.name} has reached 0 Strikes and becomes a Hollow Tongue. The character is no longer under player control.</p>` : "";
      await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Corrupted Casting Resolved", `${damageText}${transformText}`, transformed ? "danger" : ones ? "danger" : "success")});
      this.render(false);
    }

    async _onCorruptedAction(event) {
      event.preventDefault();
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "corrupted") return;
      const action = event.currentTarget.dataset.corruptedAction;
      if (action === "cast") return this._corruptedStartCast({purpose:"casting"});
      if (action === "stone-armor") return this._corruptedStartCast({purpose:"armor"});
      if (action === "stone-miraculous") return this._corruptedStartCast({purpose:"miraculous"});
      if (action === "reroll-one") return this._corruptedRerollOne();
      if (action === "resolve") return this._corruptedResolveCast();
      if (action === "daily-recovery") return this._recoverCorrupted(this.actor);
      if (action === "clear-transformation") {
        if (!game.user?.isGM) return ui.notifications.warn("Only the GM should return a transformed Corrupted character to player control.");
        await this.actor.update({"system.corruptedTransformed":false});
        return this.render(false);
      }
    }

    async _onReptileRiderAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.reptileRiderAction;
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "reptileRider") return;
      const s = this.actor.system;

      if (action === "mount" || action === "dismount") {
        const mounted = action === "mount";
        await this.actor.update({"system.reptileMounted": mounted});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard(mounted ? "Mount Up" : "Dismount", `<p><strong>${this.actor.name}</strong> is now <strong>${mounted ? "mounted on" : "dismounted from"}</strong> their reptile companion.</p>${mounted ? "<p>Mounted Calvary, Scary Scales, and Evasive Maneuvers are active.</p>" : "<p>The reptile now uses the Rider's Armor and Miraculous Save ratings. Rider and reptile may move independently, but only one may take the attack action.</p>"}`, "success")});
        return this.render(false);
      }

      if (action === "bite") {
        const target = Math.min(6, Math.max(2, Number(s.attackTarget ?? 3)));
        const roll = await (new Roll("2d6kh1")).evaluate();
        const results = roll.dice[0]?.results?.map(r=>r.result) ?? [roll.total];
        const kept = Math.max(...results);
        const success = kept === 1 ? false : (kept === 6 ? true : kept >= target);
        let strikes = success ? 1 : 0;
        const confirms = [];
        if (success && kept === 6) {
          let confirming = true;
          while (confirming) {
            const cr = await (new Roll("1d6")).evaluate();
            const value = Number(cr.total);
            confirms.push(value);
            if (value === 6) strikes += 1;
            else confirming = false;
          }
        }
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("Trusted Companion — Reptile Bite", `<p>Target <strong>${target}+</strong></p><p>2d6 keep highest (Trusted Companion Boon): ${results.join(", ")} → <strong>${kept}</strong></p><p class="moss-result ${success ? "success" : "failure"}">${success ? "HIT" : "MISS"}</p>${success ? `<p>Damage: <strong>${strikes} Strike${strikes===1?"":"s"}</strong></p>` : ""}${confirms.length ? `<p>Crit confirmations: ${confirms.join(", ")}</p>` : ""}<p><small>The reptile shares your attack action; this bite is the attack action for the turn.</small></p>`, success ? "success" : "danger")});
        return;
      }

      if (action === "reptile-armor") {
        if (s.reptileMounted) return ui.notifications.warn("Bonded gives the reptile your Armor Save while dismounted. Dismount first to use this companion save button.");
        return this._rollTargetPool("Reptile Armor Save — Bonded", Number(s.armorSave ?? 6), 0, 0, ["Dismounted reptile uses the Rider's Armor Save"]);
      }

      if (action === "reptile-miraculous") {
        if (s.reptileMounted) return ui.notifications.warn("Bonded gives the reptile your Miraculous Save while dismounted. Dismount first to use this companion save button.");
        return this._rollTargetPool("Reptile Miraculous Save — Bonded", Number(s.miraculousSave ?? 6), 0, 0, ["Dismounted reptile uses the Rider's Miraculous Save"]);
      }

      if (action === "post-special") {
        const ability = String(s.reptileSpecialAbility ?? "").trim();
        if (!ability) return ui.notifications.warn("Enter the reptile's special ability first.");
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Trusted Companion — Special Ability", `<p><strong>${this.actor.name}'s reptile:</strong> ${ability.replace(/\n/g,"<br>")}</p><p><small>Reptile-related actions roll with a Boon when a roll is required.</small></p>`, "success")});
      }
    }

    async _onFrogTosserAction(event) {
      event.preventDefault();
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "frogTosser") return;
      const action = event.currentTarget.dataset.frogTosserAction;
      const s = this.actor.system;

      if (action === "recall") {
        if (s.frogStatus === "knockedOut") return ui.notifications.warn("The frog is knocked out for the rest of the scene and cannot be recalled yet.");
        await this._clearFrogAttachment({setReady:true});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Recall Frog",`<p><strong>${this.actor.name}</strong> recalls their frog. The frog is <strong>Ready</strong>.</p>`,"quiet")});
        return this.render(false);
      }

      if (action === "pester" || action === "expose") {
        if (s.frogStatus === "knockedOut") return ui.notifications.warn("The frog is knocked out for the rest of the scene.");
        const targetToken = this._frogEnemyTargetToken();
        if (!targetToken) return;
        await this._clearFrogAttachment({setReady:false});
        const target = targetToken.actor;
        if (action === "pester") {
          await target.update({"system.frogPesterOwnerUuid":this.actor.uuid,"system.frogPesterOwnerName":this.actor.name});
        }
        await this.actor.update({"system.frogStatus":"onTarget","system.frogMode":action,"system.frogTargetUuid":target.uuid,"system.frogTargetName":target.name});
        const body = action === "pester"
          ? `<p><strong>${this.actor.name}</strong> sends their frog onto <strong>${target.name}</strong>.</p><p>While the frog remains there, ${target.name}'s attacks against ${this.actor.name} suffer <strong>1 Bane</strong>.</p><p><small>For automatic enemy attack handling, target ${this.actor.name}'s token before rolling the enemy's attack.</small></p>`
          : `<p><strong>${this.actor.name}</strong> sends their frog onto <strong>${target.name}</strong>.</p><p>${this.actor.name}'s attacks against ${target.name} <strong>crit and crit-confirm on 5+</strong>.</p><p><small>Target ${target.name}'s token before rolling the attack so Expose applies automatically.</small></p>`;
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard(action === "pester" ? "Pester" : "Expose",body,"success")});
        return this.render(false);
      }

      if (action === "sacrifice") {
        if (s.frogStatus === "knockedOut") return ui.notifications.warn("The frog is already knocked out for this scene.");
        const targetToken = this._frogEnemyTargetToken();
        if (!targetToken) return;
        const target = targetToken.actor;
        await this._clearFrogAttachment({setReady:false});
        const current = Number(target.system.strikes?.value ?? 0);
        await target.update({"system.strikes.value":Math.max(0,current-1)});
        await this.actor.update({"system.frogStatus":"knockedOut","system.frogMode":"","system.frogTargetUuid":"","system.frogTargetName":""});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Sacrifice",`<p>After a failed Armor Save, <strong>${this.actor.name}'s frog</strong> takes the blow and deals <strong>1 Strike</strong> to <strong>${target.name}</strong>.</p><p>The frog is <strong>Knocked Out</strong> for the rest of the scene.</p>`,"success")});
        return this.render(false);
      }
    }

    async _onSwarmMasterAction(event) {
      event.preventDefault();
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "swarmMaster") return;
      const action = event.currentTarget.dataset.swarmMasterAction;
      if (action === "fist") return this._swarmMasterFistOfFury();
      if (action === "tandem-armor") return this._swarmMasterArmorSaveWithBane();
    }

    _harvesterAdventurerTarget() {
      const targets = Array.from(game.user?.targets ?? []).map(t => t.actor).filter(a => a?.type === "adventurer");
      if (targets.length > 1) {
        ui.notifications.warn("Target only one Adventurer for this Harvester action.");
        return null;
      }
      return targets[0] ?? this.actor;
    }

    async _onHarvesterAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.harvesterAction;
      if (this.actor.type !== "adventurer" || this.actor.system.path !== "harvester") return;
      const uses = Math.max(0, Math.min(6, Number(this.actor.system.poisonKitUses ?? 6)));
      const harvests = Math.max(0, Number(this.actor.system.harvestUses ?? 0));

      if (action === "coat-damage" || action === "coat-bane") {
        if (uses <= 0) return ui.notifications.warn("The Poison Kit is empty.");
        if (this.actor.system.harvesterCoating) return ui.notifications.warn("A weapon is already coated. Resolve that coating before preparing another.");
        const mode = action === "coat-damage" ? "damage" : "bane";
        await this.actor.update({"system.harvesterCoating": mode});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Poison Kit — Weapon Coated", `<p><strong>${this.actor.name}</strong> coats a weapon as a free action.</p><p>On the next applicable hit, choose already primed: <strong>${mode === "damage" ? "+1 Strike" : "Bane to all of the enemy's actions"}</strong>.</p><p><small>Melee: the use is consumed on a hit. Ranged: the use is consumed even on a miss.</small></p>`, "quiet")});
        return this.render(false);
      }

      if (action === "clear-coating") {
        if (!this.actor.system.harvesterCoating) return ui.notifications.warn("No Poison coating is currently primed.");
        await this.actor.update({"system.harvesterCoating":""});
        return this.render(false);
      }

      if (action === "harvest-offense" || action === "harvest-defense") {
        const tool = action === "harvest-offense" ? "offense" : "defense";
        await this.actor.update({"system.harvestedTool":tool});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Tools of the Trade", `<p><strong>${this.actor.name}</strong> harvests an <strong>${tool === "offense" ? "offensive" : "defensive"}</strong> tool from the remains.</p><p>It grants <strong>2 Boons</strong> to the appropriate offense or defense roll. If <strong>any die rolls a 1</strong>, the harvested tool breaks after the action, even if another die succeeds.</p><p><small>Only the Harvester can use this tool. Hero Dice may be spent normally to reroll 1s if desired.</small></p>`, "success")});
        return this.render(false);
      }

      if (action === "clear-tool") {
        if (!this.actor.system.harvestedTool) return ui.notifications.warn("No harvested tool is currently recorded.");
        await this.actor.update({"system.harvestedTool":""});
        return this.render(false);
      }

      if (action === "take-harvest") {
        await this.actor.update({"system.harvestUses": harvests + 1});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Harvest Remains", `<p><strong>${this.actor.name}</strong> collects a usable harvest from a defeated enemy.</p><p>Available harvests: <strong>${harvests + 1}</strong>.</p>`, "quiet")});
        return this.render(false);
      }

      if (action === "blood") {
        if (harvests <= 0) return ui.notifications.warn("No harvested remains are available to consume.");
        const target = this._harvesterAdventurerTarget();
        if (!target) return;
        if (target.system.path === "corrupted") return ui.notifications.warn(`${target.name} is Corrupted and cannot be healed by normal healing.`);
        if ([target.system.activeSammichPreset,target.system.activeSammichSecondaryPreset].includes("ghostPepper")) return ui.notifications.warn(`${target.name} cannot be healed today because of Ghost Pepper Stack.`);
        const current=Number(target.system.strikes?.value??0), max=Number(target.system.strikes?.max??current);
        if (current >= max) return ui.notifications.warn(`${target.name} is already at maximum Strikes.`);
        await target.update({"system.strikes.value":Math.min(max,current+1)});
        await this.actor.update({"system.harvestUses":harvests-1});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Blood for Blood", `<p><strong>${this.actor.name}</strong> consumes one harvest to heal <strong>${target.name}</strong> for 1 Strike.</p><p>Harvests remaining: <strong>${harvests-1}</strong>.</p>`, "success")});
        return this.render(false);
      }

      if (action === "poison-refill") {
        if (harvests <= 0) return ui.notifications.warn("No harvested remains are available to consume.");
        if (uses >= 6) return ui.notifications.warn("The Poison Kit is already full.");
        const roll = await (new Roll("2d6kl1")).evaluate();
        const results=roll.dice[0]?.results?.map(r=>r.result)??[roll.total];
        const kept=Math.min(...results);
        const restored=Math.min(6-uses,kept);
        await this.actor.update({"system.harvestUses":harvests-1,"system.poisonKitUses":Math.min(6,uses+kept)});
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("You Don't Need That Anymore", `<p>Consume one harvest from a <strong>poison-capable enemy</strong>. Rolled ${results.join(", ")}; keep lowest <strong>${kept}</strong>.</p><p>Poison Kit restores <strong>${restored}</strong> use${restored===1?"":"s"}: ${uses}/6 → <strong>${Math.min(6,uses+kept)}/6</strong>.</p><p><small>The RR/player confirms that the harvested enemy had Poison capabilities.</small></p>`, "success")});
        return this.render(false);
      }

      if (action === "poison-removal") {
        if (game.combat?.started) return ui.notifications.warn("Poison Removal can only be used outside combat.");
        const target=this._harvesterAdventurerTarget();
        if (!target) return;
        if (target.system.poisonTerminal) return ui.notifications.warn(`${target.name} has Terminal Poison and can no longer be cured.`);
        if (!target.system.poisonActive && Number(target.system.poisonMarks??0)<=0) return ui.notifications.warn(`${target.name} is not currently Poisoned.`);
        const tn=Math.max(2,Math.min(6,Number(target.system.miraculousSave??6)));
        const roll=await (new Roll("1d6")).evaluate();
        const die=Number(roll.total);
        const success=die===6 || (die!==1 && die>=tn);
        const updates={"system.poisonMarks":0,"system.poisonActive":false,"system.poisonTerminal":false,"system.poisonCurePending":false};
        if (!success) updates["system.strikes.value"]=Math.max(0,Number(target.system.strikes?.value??0)-1);
        await target.update(updates);
        await this.actor.update({"system.poisonKitUses":Math.min(6,uses+1)});
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("Poison Removal", `<p><strong>${this.actor.name}</strong> attempts a second Poison Save for <strong>${target.name}</strong> after their failed normal Poison Save.</p><p>Target ${tn}+; rolled <strong>${die}</strong> — <strong>${success?"SUCCESS":"FAILURE"}</strong>.</p><p>Poison is removed either way and the Poison Kit gains <strong>+1 use</strong>${uses>=6?" (already at maximum)":""}.</p>${success?"":`<p><strong>${target.name}</strong> also loses 1 Strike.</p>`}<p><small>Karma and Hero Dice cannot modify this Poison Save.</small></p>`, success?"success":"danger")});
        return this.render(false);
      }
    }

    async _onFlawAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.flawAction;
      if (action === "reset") {
        await this.actor.update({"system.flawUsed": false});
        return this.render(false);
      }
      if (action !== "invoke") return;
      if (this.actor.system.flawUsed) {
        return ui.notifications.warn("This Flaw has already been invoked this scene. Reset it when a new scene begins.");
      }

      const roll = await (new Roll("2d6kl1")).evaluate();
      const results = roll.dice[0]?.results?.map(r => r.result) ?? [];
      const kept = Math.min(...results);
      const heroDiceGained = results.filter(r => r === 6).length;
      const updates = {
        "system.karma": Number(this.actor.system.karma ?? 0) + 2,
        "system.flawUsed": true
      };
      if (heroDiceGained) updates["system.heroDice"] = Number(this.actor.system.heroDice ?? 0) + heroDiceGained;
      await this.actor.update(updates);

      const flawLabel = this.actor.system.flawName?.trim() || "Flaw";
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        flavor: `<strong>${flawLabel} invoked</strong><br>Roll with a Bane: keep lowest = <strong>${kept}</strong><br>Gain <strong>2 Karma</strong>${heroDiceGained ? ` and <strong>${heroDiceGained} Hero Die${heroDiceGained === 1 ? "" : "s"}</strong>` : ""}.<br><small>Apply the kept die against the action's normal target number. A Flaw may be used once per scene.</small>`
      });
      this.render(false);
    }

    async _onWarriorAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.warriorAction;
      const s = this.actor.system;
      if (s.path === "shieldBearer") {
        if (action === "new-shield") {
          await this.actor.update({"system.shieldIntact":true});
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Shield Ready",`<p><strong>${this.actor.name}</strong> has a shield again. Extra Defense and Shield Expertise are active.</p>`,"success")});
          return this.render(false);
        }
        if (action === "shield-expertise") {
          if (s.shieldIntact === false) return ui.notifications.warn("Shield Expertise is unavailable while the shield is broken.");
          if (s.shieldExpertiseUsed) return ui.notifications.warn("Shield Expertise has already been used this scene.");
          const targetActor = Array.from(game.user?.targets ?? []).map(t=>t.actor).find(a=>a?.type==="adventurer") ?? this.actor;
          const current = Number(targetActor.system.strikes?.value ?? 0), max = Number(targetActor.system.strikes?.max ?? current);
          if (current < max) await targetActor.update({"system.strikes.value":Math.min(max,current+1)});
          await this.actor.update({"system.shieldExpertiseUsed":true});
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Shield Expertise",`<p><strong>${this.actor.name}</strong> uses the shield to absorb <strong>1 Strike</strong> from a failed Armor Save for <strong>${targetActor.name}</strong>.</p><p>${current < max ? "The prevented Strike has been restored automatically." : "No Strike was currently missing, so the prevention is recorded without changing Strikes."}</p>`,"success")});
          return this.render(false);
        }
        if (action === "intercept") {
          const ally = Array.from(game.user?.targets ?? []).map(t=>t.actor).find(a=>a?.type==="adventurer" && a.uuid!==this.actor.uuid);
          let boons = s.shieldIntact === false ? 0 : 1;
          const notes = ["Intercept: use the Shield Bearer's own Armor Save", ...(s.shieldIntact === false ? ["Shield broken: Extra Defense inactive"] : ["Extra Defense: +1 Boon"] )];
          const out = await this._rollTargetPool(`Intercept Armor Save${ally?` for ${ally.name}`:""}`, Number(s.armorSave ?? 5), boons, 0, notes);
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Intercept",`<p><strong>${this.actor.name}</strong> ${ally?`intercepts the attack on <strong>${ally.name}</strong>`:"intercepts an adjacent ally's attack"}. ${out?.success?"The Armor Save succeeds.":"The Armor Save fails."}</p><p><small>Karma may be spent on this save as normal; adjust Karma manually if used.</small></p>`,out?.success?"success":"danger")});
          return out;
        }
        if (action === "defensive-hero") {
          if (this._heroDiceBlocked(this.actor)) return ui.notifications.warn("Hero Dice cannot be used right now.");
          const hero = Number(s.heroDice ?? 0); if (hero < 1) return ui.notifications.warn("No Hero Dice available.");
          const roll = await (new Roll("2d6kh1")).evaluate();
          await this.actor.update({"system.heroDice":hero-1});
          await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:mossCard("Staying Alive — Defensive Hero Die",`<p>Spend 1 Hero Die. Because this reroll aids a defensive maneuver, it rolls with a Boon: <strong>2d6 keep highest</strong>.</p>`,"success")});
          return this.render(false);
        }
        if (action === "not-today-break" || action === "not-today-karma") {
          if (s.shieldNotTodayUsed) return ui.notifications.warn("Not Today! has already been used this scene.");
          if (s.shieldIntact === false) return ui.notifications.warn("Not Today! requires an intact shield.");
          const ally = Array.from(game.user?.targets ?? []).map(t=>t.actor).find(a=>a?.type==="adventurer") ?? this.actor;
          if (action === "not-today-karma") {
            const karma=Number(s.karma??0); if (karma<5) return ui.notifications.warn("Not Today! needs 5 Karma to avoid breaking the shield.");
            await this.actor.update({"system.karma":karma-5,"system.shieldNotTodayUsed":true});
            await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Not Today!",`<p><strong>${this.actor.name}</strong> protects <strong>${ally.name}</strong> from all attack damage for one round and spends <strong>5 Karma</strong> to keep the shield intact.</p><p><small>Ignore attack damage to the protected character for this round. Area/cleave absorption still requires narrative approval.</small></p>`,"success")});
          } else {
            await this.actor.update({"system.shieldIntact":false,"system.shieldNotTodayUsed":true});
            await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Not Today!",`<p><strong>${this.actor.name}</strong> protects <strong>${ally.name}</strong> from all attack damage for one round. The shield is <strong>destroyed</strong>.</p><p>All absorbed damage is reflected to the attacker. Track the absorbed amount during the round and apply it to the attacker when the protection ends.</p><p><small>Extra Defense and Shield Expertise are inactive until a new shield is found.</small></p>`,"danger")});
          }
          return this.render(false);
        }
      }
      if (s.path === "barbarian") {
        if (action === "too-angry") {
          const roll=await (new Roll("1d6")).evaluate(); const val=Number(roll.total), success=val===6;
          await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:mossCard("Too Angry to Die",`<p>About to lose the last Strike: rolled <strong>${val}</strong>.</p><p><strong>${success?"6 — Ignore the hit and immediately make an attack back!":"The hit is not prevented."}</strong></p>`,success?"success":"danger")});
          return;
        }
        if (action === "bloodlust") {
          await this.actor.update({"system.barbarianBloodlustPrimed":true});
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Bloodlust",`<p>After a killing blow, <strong>${this.actor.name}</strong> primes the free Bloodlust attack against an adjacent enemy not already attacked this turn.</p><p>The next Attack roll is consumed as the Bloodlust attack. If it hits, it is a guaranteed crit and confirms normally.</p>`,"success")});
          return this.render(false);
        }
      }
      if (s.path === "hollowTongueHunter") {
        if (action === "nimble") {
          let boons=1; const notes=["Nimble: +1 Boon because the Miraculous Save is performed with a jumping action"];
          if (this._activeHollowThreats().hollowTongue) { boons+=1; notes.push("Legendary: +1 Boon against Hollow Tongues"); }
          return this._rollTargetPool("Nimble — Jumping Miraculous Save",Number(s.miraculousSave??6),boons,0,notes);
        }
        if (action === "jump") {
          if (s.hunterAirborne) return ui.notifications.warn("The Hollow Tongue Hunter is already airborne. Use Crash Down on the next turn.");
          await this.actor.update({"system.hunterAirborne":true});
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Jump",`<p><strong>${this.actor.name}</strong> leaps high into the air and is out of reach until their next turn.</p><p>On the next turn, use <strong>Crash Down</strong> on a Near or Far enemy. The landing counts as movement and attack and automatically hits for a crit.</p>`,"success")});
          return this.render(false);
        }
        if (action === "crash") {
          if (!s.hunterAirborne) return ui.notifications.warn("Use Jump first; Crash Down occurs on the next turn.");
          let strikes=1, confirms=[]; let confirming=true;
          while(confirming){ const r=await (new Roll("1d6")).evaluate(); const v=Number(r.total); confirms.push(v); if(v===6) strikes+=1; else confirming=false; await r.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:mossCard("Jump — Crit Confirmation",`<p>Confirmation roll: <strong>${v}</strong>${v===6?" — +1 Strike and roll again.":" — chain ends."}</p>`,v===6?"success":"quiet")}); }
          await this.actor.update({"system.hunterAirborne":false});
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Jump — Crash Down",`<p><strong>${this.actor.name}</strong> crashes onto a Near or Far enemy. The landing automatically hits for a <strong>crit</strong>.</p><p>Damage: <strong>${strikes} Strike${strikes===1?"":"s"}</strong>. Confirmation rolls: ${confirms.join(", ")}.</p><p><small>This landing uses both movement and attack for the turn.</small></p>`,"success")});
          return this.render(false);
        }
        if (action === "polearm-approach" || action === "polearm-retreat") {
          const desc=action==="polearm-approach"?"an enemy entering your extended reach before it reaches a nearby target":"an enemy trying to move away from you";
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Polearm Expert — Reaction",`<p><strong>${this.actor.name}</strong> may make a free polearm attack against ${desc}.</p>${action==="polearm-retreat"?"<p>If the attack hits, the enemy cannot move away.</p>":""}<p><small>Set Attack Style to Polearm and make the free Attack roll; Polearm Expert's Boon is applied automatically.</small></p>`,"quiet")});
          return;
        }
      }
    }

    async _onFieldChange(event) {
      const field = event.currentTarget;
      const path = field?.name;
      if (!path) return;
      let value;
      if (field.type === "checkbox") value = field.checked;
      else if (field.type === "number") value = field.value === "" ? null : Number(field.value);
      else value = field.value;
      await this.actor.update({[path]: value});
    }

    async _onRoll(event) {
      event.preventDefault();
      const kind = event.currentTarget.dataset.roll;
      const s = this.actor.system;
      if (["d6","boon","bane"].includes(kind)) {
        const lucky = this.actor.type === "adventurer" && this.actor.system.whisperEffects?.lucky ? 1 : 0;
        const frogCheckBoon = this.actor.type === "adventurer" && this.actor.system.path === "frogTosser" && this.actor.system.frogWayChoice === "boon" && this.actor.system.frogWayBoon === "checks" ? 1 : 0;
        const scarredCheckBoon = this.actor.type === "adventurer" ? this._scarredBoonCount("checks") : 0;
        const boons = (kind === "boon" ? 1 : 0) + lucky + frogCheckBoon + scarredCheckBoon;
        const banes = kind === "bane" ? 1 : 0;
        const notes = [];
        if (lucky) notes.push("Whisper Stone of the Lucky: +1 Boon");
        if (frogCheckBoon) notes.push("The Way of the Frog: chosen general-check Boon");
        if (scarredCheckBoon) notes.push(`Scarred: +${scarredCheckBoon} Boon${scarredCheckBoon===1?"":"s"} to general checks`);
        const label = kind === "d6" ? "Check" : kind === "boon" ? "Check with Boon" : "Check with Bane";
        return this._rollUntargetedPool(label, boons, banes, notes);
      }
      if (kind === "armor") {
        let boons = 0;
        const notes = [];
        if (this.actor.type === "adventurer" && s.predatorAbility === "defiant" && s.predatorAbilityActive && Number(s.strikes?.value ?? 0) === 1) {
          boons += 1;
          notes.push("Defiant: +1 Boon");
        }
        if (this.actor.type === "adventurer" && s.whisperEffects?.lucky) { boons += 1; notes.push("Whisper Stone of the Lucky: +1 Boon"); }
        if (this.actor.type === "adventurer" && s.path === "frogTosser" && s.frogWayChoice === "boon" && s.frogWayBoon === "armor") { boons += 1; notes.push("The Way of the Frog: chosen Armor Save Boon"); }
        if (this.actor.type === "adventurer" && s.path === "shieldBearer" && s.shieldIntact !== false) { boons += 1; notes.push("Extra Defense: shield grants +1 Boon"); }
        if (this.actor.type === "adventurer" && s.path === "hollowTongueHunter" && this._activeHollowThreats().hollowTongue) { boons += 1; notes.push("Legendary: +1 Boon against Hollow Tongues"); }
        const scarredArmorBoon = this.actor.type === "adventurer" ? this._scarredBoonCount("armor") : 0;
        if (scarredArmorBoon) { boons += scarredArmorBoon; notes.push(`Scarred: +${scarredArmorBoon} Armor Save Boon${scarredArmorBoon===1?"":"s"}`); }
        let outcome = await this._rollTargetPool("Armor Save", Number(s.armorSave ?? 6), boons, 0, notes);
        if (outcome?.success && Number(outcome.result) === 6 && this.actor.type === "adventurer" && s.path === "shieldBearer" && s.shieldIntact !== false) {
          const enemyTargets = Array.from(game.user?.targets ?? []).filter(t => t.actor?.type === "enemy");
          if (enemyTargets.length === 1) {
            const enemy = enemyTargets[0].actor;
            const current = Number(enemy.system.strikes?.value ?? 0);
            await enemy.update({"system.strikes.value":Math.max(0,current-1)});
            await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Extra Defense",`<p><strong>${this.actor.name}</strong> rolls a 6 on the Armor Save. The shield punishes <strong>${enemy.name}</strong> for <strong>1 Strike</strong>.</p>`,"success")});
          } else {
            await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:mossCard("Extra Defense",`<p><strong>${this.actor.name}</strong> rolls a 6 on the Armor Save. Extra Defense deals <strong>1 Strike</strong> to the attacker. Target exactly one enemy before the save for automatic damage.</p>`,"success")});
          }
        }
        if (this.actor.type === "adventurer" && s.path === "reptileRider" && s.reptileMounted && Number(outcome?.result) === 1 && game.combat?.started) {
          const roundKey = `${game.combat.id}:${Number(game.combat.round ?? 0)}`;
          if (s.reptileEvasiveRound !== roundKey) {
            const reroll = await (new Roll("1d6")).evaluate();
            const value = Number(reroll.total);
            const success = value === 6 || (value !== 1 && value >= Number(s.armorSave ?? 6));
            await this.actor.update({"system.reptileEvasiveRound":roundKey});
            await reroll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:mossCard("Evasive Maneuvers — Free Reroll", `<p>The mounted Rider rerolls an Armor Save result of 1 once this round without spending a Hero Die.</p><p>Reroll: <strong>${value}</strong> vs ${Number(s.armorSave ?? 6)}+ — <strong>${success ? "SUCCESS" : "FAILURE"}</strong></p>`, success ? "success" : "danger")});
            outcome = {roll:reroll,result:value,success,net:0};
          }
        }
        if (!outcome?.success && this.actor.type === "adventurer" && this.actor.system.whisperEffects?.protection) {
          await this.actor.update({"system.whisperEffects.protection": false});
          await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<div class="moss-chat"><h3>Whisper Stone of Protection</h3><p>${this.actor.name}'s Armor Save failed, but the orbiting stones take the hit instead. The Protection effect is now spent.</p></div>`});
          this.render(false);
        }
        return outcome;
      }
      if (kind === "miraculous") {
        let boons = 0;
        const notes = [];
        const incs = this._activeInclinations();
        const sammiches = this._activeSammichPresets();
        if (this.actor.type === "adventurer" && s.species === "hare") { boons += 1; notes.push("Lucky Rabbit Feet: +1 Boon"); }
        if (this.actor.type === "adventurer" && incs.includes("greensFavored")) { boons += 1; notes.push("The Green's Favored: +1 Boon"); }
        if (this.actor.type === "adventurer" && sammiches.includes("champion")) { boons += 1; notes.push("Champion Sammich: +1 Boon"); }
        if (this.actor.type === "adventurer" && s.whisperEffects?.lucky) { boons += 1; notes.push("Whisper Stone of the Lucky: +1 Boon"); }
        if (this.actor.type === "adventurer" && s.path === "frogTosser" && s.frogWayChoice === "boon" && s.frogWayBoon === "miraculous") { boons += 1; notes.push("The Way of the Frog: chosen Miraculous Save Boon"); }
        if (this.actor.type === "adventurer" && s.path === "hollowTongueHunter" && this._activeHollowThreats().hollowTongue) { boons += 1; notes.push("Legendary: +1 Boon against Hollow Tongues"); }
        const scarredMiraculousBoon = this.actor.type === "adventurer" ? this._scarredBoonCount("miraculous") : 0;
        if (scarredMiraculousBoon) { boons += scarredMiraculousBoon; notes.push(`Scarred: +${scarredMiraculousBoon} Miraculous Save Boon${scarredMiraculousBoon===1?"":"s"}`); }
        return this._rollTargetPool("Miraculous Save", Number(s.miraculousSave ?? 6), boons, 0, notes);
      }
      if (kind === "poison") return this._rollPoisonSave();
      if (kind === "predator") return this._rollCheck("Predator Roll", Number(s.predatorDice ?? 1), "high");
      if (kind === "forage") return this._rollForage(event.currentTarget.dataset.rollMode || "normal");
    }

    async _onAttack(event) {
      event.preventDefault();
      const s = this.actor.system;
      const mode = event.currentTarget.dataset.attack || "normal";
      let target = Math.min(6, Math.max(2, Number(s.attackTarget ?? 3)));
      const style = s.attackStyle || "melee";
      const meleeStyles = ["melee", "largeMelee", "natural", "polearm"];
      const rangedStyles = ["ranged", "mountedRanged", "swarmStrike"];
      const isSwarmStrike = this.actor.type === "adventurer" && s.path === "swarmMaster" && style === "swarmStrike";
      const isMelee = meleeStyles.includes(style);
      const isRanged = rangedStyles.includes(style);
      const incs = this._activeInclinations();

      if (this.actor.type === "adventurer" && s.path === "shieldBearer" && isRanged) {
        return ui.notifications.warn("Shield Bearers can only use melee attacks.");
      }
      if (this.actor.type === "adventurer" && isRanged && s.supplyEffects?.noAmmo && !isSwarmStrike) {
        return ui.notifications.warn("No Ammo is active. Ranged attacks are currently impossible.");
      }

      let boons = 0;
      let banes = 0;
      const notes = [];
      if (this.actor.type === "enemy") {
        const targetedAdventurers = Array.from(game.user?.targets ?? []).map(t=>t.actor).filter(a=>a?.type==="adventurer");
        if (targetedAdventurers.some(a=>this._activeInclinations(a).includes("combatTested"))) {
          target = Math.max(target,4);
          notes.push("Combat Tested: target requires 4+ to hit");
        }
      }
      if (isSwarmStrike) notes.push("Swarm Strike: ranged attack using the swarm; ignores No Ammo and cannot crit");
      if (this.actor.type === "enemy" && s.harvesterPoisonBane) { banes += 1; notes.push("Harvester Poison: +1 Bane to all actions"); }
      if (this.actor.type === "enemy" && s.frogPesterOwnerUuid) {
        const targetActors = Array.from(game.user?.targets ?? []).map(t => t.actor).filter(Boolean);
        if (targetActors.some(a => a.uuid === s.frogPesterOwnerUuid)) { banes += 1; notes.push(`Pester: +1 Bane attacking ${s.frogPesterOwnerName || "the Frog Tosser"}`); }
      }
      const sammiches = this._activeSammichPresets();
      if (this.actor.type === "adventurer" && s.whisperEffects?.lucky) { boons += 1; notes.push("Whisper Stone of the Lucky: +1 Boon"); }

      // Standard attack-training Boons do not stack with one another. Collapse them to a single Boon.
      let trainedBoon = false;
      if (this.actor.type === "adventurer") {
        if (isMelee && incs.includes("meleeTraining")) { trainedBoon = true; notes.push("Melee Training"); }
        if (isRanged && incs.includes("rangedTraining")) { trainedBoon = true; notes.push("Ranged Training"); }
        if (s.path === "barbarian" && style === "largeMelee") { trainedBoon = true; notes.push("Everything is a Weapon"); }
        if (s.path === "hollowTongueHunter" && style === "polearm") { trainedBoon = true; notes.push("Polearm Expert"); }
        if (s.path === "hollowTongueHunter" && isMelee && this._activeHollowThreats().hollowTongue) { boons += 1; notes.push("Legendary: +1 Boon to melee attacks against Hollow Tongues"); }
        if (s.path === "reptileRider" && isRanged) { trainedBoon = true; notes.push("Ranger Training"); }
        if (s.species === "mole" && style === "natural") { trainedBoon = true; notes.push("Big Claws"); }
        if (s.path === "swarmMaster" && style === "natural") { trainedBoon = true; notes.push("Scrappy"); }
        if (s.path === "frogTosser" && ((s.frogTraveler === "melee" && isMelee) || (s.frogTraveler === "ranged" && isRanged))) { trainedBoon = true; notes.push(`Traveler: Boon to ${s.frogTraveler} attacks`); }
        if (s.path === "frogTosser" && s.frogWayChoice === "boon" && ((s.frogWayBoon === "melee" && isMelee) || (s.frogWayBoon === "ranged" && isRanged))) { trainedBoon = true; notes.push("The Way of the Frog: chosen attack Boon"); }
        if (trainedBoon) boons += 1;
        const scarredAttackType = isMelee ? "melee" : isRanged ? "ranged" : "";
        const scarredAttackBoon = scarredAttackType ? this._scarredBoonCount(scarredAttackType) : 0;
        if (scarredAttackBoon) { boons += scarredAttackBoon; notes.push(`Scarred: +${scarredAttackBoon} ${scarredAttackType} attack Boon${scarredAttackBoon===1?"":"s"}`); }

        if (s.poisonActive) { banes += 1; notes.push("Poison: +1 Bane"); }
        if (isMelee && s.supplyEffects?.fatigued) { banes += 1; notes.push("Fatigued: +1 Bane"); }
      }

      if (mode === "boon") { boons += 1; notes.push("Manual Boon"); }
      if (mode === "bane") { banes += 1; notes.push("Manual Bane"); }

      // Shield Bearer melee attacks are immune to Banes.
      if (this.actor.type === "adventurer" && s.path === "shieldBearer" && isMelee && banes) {
        notes.push(`Unmovable: ignored ${banes} Bane${banes === 1 ? "" : "s"}`);
        banes = 0;
      }

      const net = boons - banes;
      const diceCount = 1 + Math.abs(net);
      const keep = net < 0 ? "low" : "high";
      const formula = diceCount > 1 ? `${diceCount}d6${keep === "low" ? "kl1" : "kh1"}` : "1d6";
      const roll = await (new Roll(formula)).evaluate();
      const results = roll.dice[0]?.results?.map(r => r.result) ?? [roll.total];
      const kept = keep === "low" ? Math.min(...results) : Math.max(...results);
      let success = kept === 1 ? false : (kept === 6 ? true : kept >= target);
      if (this.actor.type === "adventurer" && sammiches.includes("ghostPepper")) {
        success = true;
        notes.push("Ghost Pepper Stack: attack automatically hits");
      }

      let critThreshold = 6;
      let confirmThreshold = 6;
      let critDisabled = false;
      if (this.actor.type === "enemy") {
        const targets = Array.from(game.user?.targets ?? []).map(t=>t.actor).filter(a=>a?.type==="adventurer");
        if (targets.some(a=>a.system.damagedEquipmentCritVulnerable)) { critThreshold = 5; notes.push("Damaged Equipment: target can be crit on 5+"); }
      }
      if (this.actor.type === "adventurer") {
        if (isMelee && incs.includes("meleeSpecialist")) { critThreshold = 5; notes.push("Melee Specialist: crit on 5+"); }
        if (isRanged && incs.includes("rangedSpecialist")) { critThreshold = 5; notes.push("Ranged Specialist: crit on 5+"); }
        if (s.path === "barbarian" && style === "largeMelee") { critThreshold = 5; notes.push("Large Weapon: crit on 5+"); }
        if (s.path === "reptileRider" && isRanged && s.reptileMounted) { critThreshold = 5; confirmThreshold = 5; notes.push("Mounted Calvary: mounted ranged attacks crit and confirm on 5+"); }
        else if (s.path === "reptileRider" && style === "mountedRanged" && !s.reptileMounted) { notes.push("Mounted Ranged selected while dismounted: Mounted Calvary is inactive"); }
        if (s.path === "frogTosser" && s.frogStatus !== "knockedOut" && s.frogMode === "expose" && s.frogTargetUuid) {
          const targetActors = Array.from(game.user?.targets ?? []).map(t => t.actor).filter(Boolean);
          if (targetActors.some(a => a.uuid === s.frogTargetUuid)) { critThreshold = Math.min(critThreshold,5); confirmThreshold = Math.min(confirmThreshold,5); notes.push(`Expose: crit and confirm on 5+ against ${s.frogTargetName || "frog target"}`); }
        }
        if (sammiches.includes("cloverClub")) { confirmThreshold = 5; notes.push("Clover Club: confirm on 5+"); }
        if (s.path === "shieldBearer" && isMelee) { critDisabled = true; notes.push("Unmovable: attacks cannot crit"); }
        if (isSwarmStrike) { critDisabled = true; notes.push("Swarm Strike cannot crit"); }
      }

      const targetedHollowTongue = this.actor.type === "adventurer" && Array.from(game.user?.targets ?? []).some(t=>t.actor?.type==="enemy" && Boolean(t.actor.system.isHollowTongue));
      const hollowTongueKillerHit = this.actor.type === "adventurer" && incs.includes("hollowTongueKiller") && targetedHollowTongue && kept === 6 && success;
      if (hollowTongueKillerHit) notes.push("Hollow Tongue Killer: rolled 6 against a Hollow Tongue, 2 base Strikes");
      const crouchingPrimed = this.actor.type === "adventurer" && s.predatorAbility === "crouchingCritter" && s.crouchingCritterPrimed;
      const bloodlustPrimed = this.actor.type === "adventurer" && s.path === "barbarian" && Boolean(s.barbarianBloodlustPrimed);
      if (bloodlustPrimed) notes.push("Bloodlust: next eligible hit is a guaranteed crit");
      const isCrit = success && !critDisabled && (crouchingPrimed || bloodlustPrimed || kept >= critThreshold);
      let strikes = success ? (hollowTongueKillerHit ? 2 : 1) : 0;
      if (this.actor.type === "adventurer" && success && s.predatorAbility === "berserker" && s.predatorAbilityActive && Number(s.strikes?.value ?? 0) === 1 && !isSwarmStrike) {
        strikes = 2;
        notes.push("Berserker: 2 base Strikes");
      }

      const confirms = [];
      if (isCrit) {
        let confirming = true;
        while (confirming) {
          const confirmDice = crouchingPrimed ? 2 : 1;
          const confirmRoll = await (new Roll(`${confirmDice}d6`)).evaluate();
          const confirmResults = confirmRoll.dice[0]?.results?.map(r => r.result) ?? [confirmRoll.total];
          const value = Math.max(...confirmResults);
          confirms.push(confirmDice > 1 ? `${confirmResults.join("/")}→${value}` : String(value));
          if (value >= confirmThreshold) strikes += 1;
          else confirming = false;
        }
      }

      let harvesterPoisonText = "";
      if (this.actor.type === "adventurer" && s.path === "harvester" && s.harvesterCoating) {
        const coating = s.harvesterCoating;
        const consumes = isRanged || success;
        if (success && coating === "damage") {
          strikes += 1;
          notes.push("Harvester Poison: +1 Strike");
          harvesterPoisonText = "Poison adds +1 Strike.";
        }
        if (success && coating === "bane") {
          const enemyTargets = Array.from(game.user?.targets ?? []).filter(t => t.actor?.type === "enemy");
          if (enemyTargets.length === 1) {
            await enemyTargets[0].actor.update({"system.harvesterPoisonBane":true});
            notes.push(`Harvester Poison: ${enemyTargets[0].name} suffers a Bane to all actions`);
            harvesterPoisonText = `${enemyTargets[0].name} is marked with a Bane to all actions.`;
          } else {
            notes.push("Harvester Poison Bane: mark the hit enemy manually (target exactly one enemy next time for automatic marking)");
            harvesterPoisonText = "Bane poison hit, but no single enemy target was selected; apply the Bane manually.";
          }
        }
        if (consumes) {
          await this.actor.update({"system.poisonKitUses":Math.max(0,Number(s.poisonKitUses??6)-1),"system.harvesterCoating":""});
          notes.push(`Poison Kit use consumed (${Math.max(0,Number(s.poisonKitUses??6)-1)}/6 remaining)`);
        } else {
          notes.push("Melee miss: Poison coating remains primed");
        }
      }

      const updates = {};
      if (this.actor.type === "adventurer" && s.path === "shieldBearer" && isMelee && kept === 6) {
        updates["system.karma"] = Number(s.karma ?? 0) + 1;
        notes.push("Unmovable: rolled 6, +1 Karma");
      }
      if (crouchingPrimed && success && !critDisabled) {
        updates["system.crouchingCritterPrimed"] = false;
        notes.push("Crouching Critter trigger consumed");
      }
      if (bloodlustPrimed) {
        updates["system.barbarianBloodlustPrimed"] = false;
        notes.push("Bloodlust extra attack consumed");
      }
      if (Object.keys(updates).length) await this.actor.update(updates);

      // Swarm Master Bug-Fu is always paired with a Natural / Bare Paws attack.
      // Resolve the extra 1d6 attack automatically so the player only needs one combat click.
      // Supplemental rolls are collected and sent to Dice So Nice only after the
      // parent Attack message is posted, so they animate alongside the main attack
      // instead of delaying it.
      const supplemental3DRolls = [];
      let bugFuText = "";
      if (this.actor.type === "adventurer" && s.path === "swarmMaster" && style === "natural") {
        const bugRoll = await (new Roll("1d6")).evaluate();
        supplemental3DRolls.push(bugRoll);
        const bugDie = Number(bugRoll.total);
        const bugHit = bugDie === 6;
        let bugStrikes = bugHit ? 1 : 0;
        const bugConfirms = [];
        if (bugHit) {
          let confirming = true;
          while (confirming) {
            const confirmRoll = await (new Roll("1d6")).evaluate();
            supplemental3DRolls.push(confirmRoll);
            const value = Number(confirmRoll.total);
            bugConfirms.push(value);
            if (value === 6) bugStrikes += 1;
            else confirming = false;
          }
        }
        bugFuText = `<hr><strong>Bug-Fu</strong>: rolled <strong>${bugDie}</strong> — <strong>${bugHit ? "HIT" : "MISS"}</strong>${bugHit ? `<br>Bug-Fu Damage: <strong>${bugStrikes} Strike${bugStrikes === 1 ? "" : "s"}</strong>` : ""}${bugConfirms.length ? `<br>Crit confirmations: ${bugConfirms.join(", ")}` : ""}<br><small>Bug-Fu automatically accompanies Natural / Bare Paws attacks and only hits on a natural 6.</small>`;
      }

      let feistyText = "";
      if (this.actor.type === "adventurer" && incs.includes("feisty") && isMelee) {
        const feistyRoll = await (new Roll("1d6")).evaluate();
        supplemental3DRolls.push(feistyRoll);
        const feistyDie = Number(feistyRoll.total);
        const feistyHit = feistyDie === 6;
        const feistyHTK = feistyHit && incs.includes("hollowTongueKiller") && targetedHollowTongue;
        const feistyCritAllowed = s.path !== "shieldBearer";
        let feistyStrikes = feistyHit ? (feistyHTK ? 2 : 1) : 0;
        const feistyConfirms = [];
        if (feistyHit && feistyCritAllowed) {
          let confirming = true;
          while (confirming) {
            const confirmRoll = await (new Roll("1d6")).evaluate();
            supplemental3DRolls.push(confirmRoll);
            const value = Number(confirmRoll.total);
            feistyConfirms.push(value);
            if (value >= confirmThreshold) feistyStrikes += 1;
            else confirming = false;
          }
        }
        const feistyNotes = [
          feistyHTK ? "Hollow Tongue Killer makes the natural 6 deal 2 base Strikes" : "",
          !feistyCritAllowed ? "Unmovable prevents this Shield Bearer melee attack from critting" : ""
        ].filter(Boolean).join(" • ");
        feistyText = `<hr><strong>Feisty</strong>: rolled <strong>${feistyDie}</strong> — <strong>${feistyHit ? "HIT" : "MISS"}</strong>${feistyHit ? `<br>Feisty Damage: <strong>${feistyStrikes} Strike${feistyStrikes===1?"":"s"}</strong>` : ""}${feistyConfirms.length ? `<br>Crit confirmations: ${feistyConfirms.join(", ")}` : ""}${feistyNotes ? `<br><small>${feistyNotes}</small>` : ""}<br><small>Feisty automatically adds a second melee attack. It only hits on a natural 6 and can crit/confirm normally unless another rule prevents crits.</small>`;
      }

      const poolText = net === 0 ? "1d6" : net > 0 ? `${diceCount}d6 keep highest (${net} net Boon${net === 1 ? "" : "s"})` : `${diceCount}d6 keep lowest (${Math.abs(net)} net Bane${Math.abs(net) === 1 ? "" : "s"})`;
      const critText = isCrit ? `<br><strong>CRIT!</strong>${crouchingPrimed ? " Guaranteed by Crouching Critter." : ""}${bloodlustPrimed ? " Guaranteed by Bloodlust." : ""}${confirms.length ? ` Confirmation rolls: ${confirms.join(", ")}.` : ""}` : "";
      const damageText = success ? `<br>Damage: <strong>${strikes} Strike${strikes === 1 ? "" : "s"}</strong>` : "";
      const noteText = notes.length ? `<br><small>${notes.join(" • ")}</small>` : "";
      await roll.toMessage({
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        flavor: `<strong>${this.actor.name} — Attack</strong> (target ${target}+)<br>${poolText}; kept <strong>${kept}</strong><br><strong>${success ? "HIT" : "MISS"}</strong>${critText}${damageText}${noteText}${bugFuText}${feistyText}`
      });
      if (supplemental3DRolls.length) {
        void Promise.allSettled(supplemental3DRolls.map((r) => showSupplemental3DRoll(r)));
      }
      this.render(false);
    }

    _playerAdventurers() {
      // Party-sheet actions are party-wide rules actions, not permission checks.
      // During setup and GM testing, Adventurers may not have player ownership assigned yet,
      // so limiting this list to hasPlayerOwner caused Safe Zone/Rest automation to skip them.
      // Include every world Adventurer, plus any synthetic Adventurer token actors currently
      // on the viewed scene, and de-duplicate by UUID.
      const adventurers = [];
      const add = actor => {
        if (!actor || actor.type !== "adventurer") return;
        if (!adventurers.some(a => a.uuid === actor.uuid)) adventurers.push(actor);
      };
      for (const actor of (game.actors ?? [])) add(actor);
      for (const token of (canvas?.tokens?.placeables ?? [])) add(token.actor);
      return adventurers;
    }

    async _rollPoisonSave() {
      const s = this.actor.system;
      if (this.actor.type === "adventurer" && this._activeSammichPresets().includes("froggyFlatbread")) {
        await this.actor.update({"system.poisonMarks":0,"system.poisonActive":false,"system.poisonTerminal":false});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<div class="moss-chat"><h3>Froggy Flatbread</h3><p>${this.actor.name} is immune to Poison for the day. No Poison Save is required.</p></div>`});
        this.render(false);
        return;
      }
      if (s.poisonTerminal) return ui.notifications.warn("This critter has reached 3 Poison Marks and can no longer be cured by Poison Saves.");
      const target = Number(s.miraculousSave ?? 6);
      const roll = await (new Roll("1d6")).evaluate();
      const result = Number(roll.total);
      let finalResult = result;
      let karmaSpent = 0;
      const poisonResistance = this._activeInclinations().includes("poisonResistance") && !this._activeInclinations().includes("scarred");
      if (poisonResistance && result !== 1 && result < target) {
        const needed = Math.max(0, target - result);
        const available = Number(s.karma ?? 0);
        if (needed > 0 && available >= needed) {
          const spend = await Dialog.confirm({title:"Poison Resistance",content:`<p>Rolled <strong>${result}</strong> vs ${target}+. Spend <strong>${needed} Karma</strong> to raise the result to ${target} and pass?</p>`});
          if (spend) { karmaSpent = needed; finalResult += needed; await this.actor.update({"system.karma":available-needed}); }
        }
      }
      const success = finalResult === 6 || (finalResult !== 1 && finalResult >= target);
      let flavor;
      if (success) {
        await this.actor.update({"system.poisonMarks": 0, "system.poisonActive": false, "system.poisonTerminal": false});
        flavor = `<strong>Poison Save</strong> — target ${target}+<br><strong>SUCCESS</strong><br>Poison completely removed.<br><small>${poisonResistance ? `Poison Resistance allows Karma${karmaSpent ? `; ${karmaSpent} spent on this save` : ""}. ` : ""}Hero Dice cannot be used on Poison Saves.</small>`;
      } else {
        const marks = Math.min(3, Number(s.poisonMarks ?? 0) + 1);
        const terminal = marks >= 3;
        await this.actor.update({"system.poisonMarks": marks, "system.poisonActive": !terminal, "system.poisonTerminal": terminal});
        flavor = `<strong>Poison Save</strong> — target ${target}+<br><strong>FAILURE</strong><br>Poison Marks: <strong>${marks}/3</strong><br>${terminal ? "<strong>TERMINAL POISON:</strong> the Bane ends, but the critter can no longer be cured and will die when they next go to sleep." : "The critter suffers 1 Bane on all actions except Armor Saves and Miraculous Saves."}<br><small>${poisonResistance ? `Poison Resistance allows Karma${karmaSpent ? `; ${karmaSpent} spent on this save` : ""}. ` : ""}Hero Dice cannot be used on Poison Saves.</small>`;
      }
      await roll.toMessage({speaker: ChatMessage.getSpeaker({actor: this.actor}), flavor});
      this.render(false);
    }

    async _rollForage(mode = "normal") {
      const formula = mode === "boon" ? "2d6kh1" : mode === "bane" ? "2d6kl1" : "1d6";
      const roll = await (new Roll(formula)).evaluate();
      const results = roll.dice[0]?.results?.map(r => r.result) ?? [roll.total];
      const kept = mode === "bane" ? Math.min(...results) : Math.max(...results);
      const found = kept === 6;
      if (found && this.actor.type === "party") {
        const current = Number(this.actor.system.supplies?.value ?? 0);
        const max = Number(this.actor.system.supplies?.max ?? 10);
        await this.actor.update({"system.supplies.value": Math.min(max, current + 1)});
      }
      const modeText = mode === "boon" ? "Boon — keep highest" : mode === "bane" ? "Bane — keep lowest" : "Normal";
      await roll.toMessage({speaker: ChatMessage.getSpeaker({actor: this.actor}), flavor: mossCard("Forage for Supplies", `<p>${modeText}; kept <strong>${kept}</strong></p><p class="moss-result ${found ? "success" : "failure"}">${found ? "FOUND 1 SUPPLY" : "NO SUPPLY FOUND"}</p>`, found ? "success" : "danger")});
      this.render(false);
    }

    async _onPartyAction(event) {
      event.preventDefault();
      const action = event.currentTarget.dataset.partyAction;
      if (this.actor.type !== "party") return;
      if (action === "predator-round") return this._resolvePredatorRound();
      if (action === "guarantee-predator") return this._guaranteePredatorRound();
      if (action === "rest-supply") return this._restWithSupply();
      if (action === "safe-rest") return this._safeZoneRest();
      if (action === "resupply") return this._resupplyAtSafeZone();
      if (action === "no-supply") return this._nightWithoutSupplies();
      if (action === "end-scene") return this._endScene();
      if (action === "identify-stones") return this._identifyPartyWhisperStones();
      if (action === "combat-summary") return this._postCombatSummary();
    }

    async _endScene() {
      const adventurers = this._playerAdventurers();
      for (const a of adventurers) {
        await a.update({
          "system.flawUsed": false,
          "system.whisperEffects": {lucky:false, protection:false},
          "system.predatorState": "",
          "system.karmaAvailable": true,
          "system.predatorAbilityActive": false,
          "system.crouchingCritterPrimed": false,
          "system.combatMedicRapidBandageRound": "",
          "system.combatMedicSurpriseUsedEnemies": [],
          "system.swarmFistOfFuryCombatId": "",
          "system.frogStatus": a.system.path === "frogTosser" ? "ready" : (a.system.frogStatus ?? "ready"),
          "system.frogMode": "",
          "system.frogTargetUuid": "",
          "system.frogTargetName": "",
          "system.priestMiracleUsed": false,
          "system.priestMiracleLastPrayer": [],
          "system.priestMiracleLastAloofness": [],
          "system.priestMiracleLastAloofnessHigh": 0,
          "system.shieldExpertiseUsed": false,
          "system.shieldNotTodayUsed": false,
          "system.barbarianBloodlustPrimed": false,
          "system.hunterAirborne": false
        });
      }
      const frogPesterEnemies = [];
      const addFrogEnemy = a => { if (a?.type === "enemy" && a.system.frogPesterOwnerUuid && !frogPesterEnemies.some(x => x.uuid === a.uuid)) frogPesterEnemies.push(a); };
      for (const enemy of game.actors.filter(a => a.type === "enemy")) addFrogEnemy(enemy);
      for (const token of canvas?.scene?.tokens ?? []) addFrogEnemy(token.actor);
      for (const combatant of game.combat?.combatants ?? []) addFrogEnemy(combatant.actor);
      for (const enemy of frogPesterEnemies) {
        await enemy.update({"system.frogPesterOwnerUuid":"","system.frogPesterOwnerName":""});
      }
      await this.actor.update({"system.predatorRoundStatus":"No Predator Round resolved yet."});
      await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("End Scene", `<p>Scene-limited Whisper Stone effects are cleared, Flaws are reset, and Predator round states are cleared for all Adventurers.</p>`, "quiet")});
      ui.notifications.info("Moss & Stone: scene effects reset for the party.");
      this.render(false);
    }

    async _identifyPartyWhisperStones() {
      const tier = Number(this.actor.system.safeZoneTier ?? 0);
      if (tier < 2) return ui.notifications.warn("Whisper Stones can be identified at a Tier 2 or Tier 3 Safe Zone.");
      const adventurers = this._playerAdventurers();
      let identified = 0;
      for (const a of adventurers) {
        const stones = a.items.filter(i => i.type === "whisperStone" && !i.system.identified);
        for (const stone of stones) {
          await stone.update({"system.identified":true});
          identified += 1;
        }
      }
      await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Whisper Stones Identified", `<p>At this Tier ${tier} Safe Zone, <strong>${identified}</strong> unidentified Whisper Stone${identified === 1 ? "" : "s"} carried by the party ${identified === 1 ? "is" : "are"} identified.</p>`, "success")});
      ui.notifications.info(identified ? `Identified ${identified} Whisper Stone${identified===1?"":"s"}.` : "The party has no unidentified Whisper Stones.");
    }

    async _postCombatSummary() {
      const combat = game.combat;
      if (!combat) return ui.notifications.warn("There is no active Combat Encounter.");
      const actors = Array.from(combat.combatants ?? []).map(c => c.actor).filter(Boolean);
      if (!actors.length) return ui.notifications.warn("The active Combat Encounter has no combatants.");
      const rows = actors.map(a => `<tr><td>${a.name}</td><td>${a.type === "adventurer" ? "Adventurer" : a.type === "enemy" ? "Enemy" : a.type}</td><td>${Number(a.system.strikes?.value ?? 0)} / ${Number(a.system.strikes?.max ?? 0)}</td><td>${Number(a.system.predatorDice ?? 1)}d6</td></tr>`).join("");
      const body = `<table class="moss-chat-table"><thead><tr><th>Name</th><th>Side</th><th>Strikes</th><th>Predator</th></tr></thead><tbody>${rows}</tbody></table>`;
      await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("Encounter Snapshot", body)});
    }

    _activeHollowThreats() {
      const actors = game.combat?.combatants?.map(c => c.actor).filter(Boolean) ?? [];
      const enemies = actors.filter(a => a.type === "enemy");
      return {hollowEyes: enemies.some(a => Boolean(a.system.isHollowEyes)), hollowTongue: enemies.some(a => Boolean(a.system.isHollowTongue))};
    }

    _predatorUpdateTargetsForCombatant(combatant) {
      const targets = [];
      const add = actor => {
        if (!actor || actor.type !== "adventurer") return;
        if (!targets.some(a => a.uuid === actor.uuid)) targets.push(actor);
      };

      // combatant.actor may be a synthetic Token Actor when the token is unlinked.
      add(combatant?.actor);

      // Also update the world Actor that the token was created from. This keeps an
      // already-open base Actor sheet in sync with the Predator Round.
      const baseActor = combatant?.actorId ? game.actors.get(combatant.actorId) : null;
      add(baseActor);
      add(combatant?.token?.baseActor);

      return targets;
    }

    async _guaranteePredatorRound() {
      const combat = game.combat;
      if (!combat) return ui.notifications.warn("Start a Combat Encounter first.");
      const candidates = Array.from(combat.combatants ?? []).map(c=>c.actor).filter(a=>a?.type==="adventurer" && Number(a.system.heroDice??0)>0 && !this._heroDiceBlocked(a));
      if (!candidates.length) return ui.notifications.warn("No Adventurer in the encounter can spend a Hero Die right now.");
      const options = candidates.map(a=>`<option value="${a.uuid}">${a.name} (${Number(a.system.heroDice??0)} Hero Dice)</option>`).join("");
      const chosen = await foundry.applications.api.DialogV2.prompt({window:{title:"Guarantee Predator Win"},content:`<p>Choose the Adventurer who sacrifices 1 Hero Die before the Predator Roll.</p><select name="actorUuid">${options}</select>`,ok:{label:"Spend Hero Die",callback:(event,button,dialog)=>dialog.element.querySelector('[name="actorUuid"]').value}});
      if (!chosen) return;
      const actor = await fromUuid(chosen);
      if (!actor) return;
      if (this._heroDiceBlocked(actor)) return ui.notifications.warn("That Adventurer cannot use Hero Dice right now.");
      const hero = Number(actor.system.heroDice??0);
      if (hero < 1) return ui.notifications.warn("That Adventurer no longer has a Hero Die to spend.");
      await actor.update({"system.heroDice":hero-1});
      await this.actor.update({"system.predatorGuaranteed":true,"system.predatorGuaranteedBy":actor.name});
      await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor}),content:mossCard("Predator Roll Guaranteed",`<p><strong>${actor.name}</strong> sacrifices 1 Hero Die before the Predator Roll. The party's next Predator Roll is guaranteed to win.</p>`,"success")});
      this.render(false);
    }

    async _resolvePredatorRound() {
      const combat = game.combat;
      if (!combat) return ui.notifications.warn("Start a Combat Encounter first. Predator Round uses the Adventurers and Enemies currently in combat.");

      const combatants = Array.from(combat.combatants ?? []);
      const adventurerCombatants = combatants.filter(c => c.actor?.type === "adventurer");
      const enemyCombatants = combatants.filter(c => c.actor?.type === "enemy");
      if (!adventurerCombatants.length || !enemyCombatants.length) return ui.notifications.warn("The active combat needs at least one Adventurer and one Enemy.");

      const primedScholar = adventurerCombatants.find(c => c.actor?.system?.path === "scholar" && Boolean(c.actor.system.scholarTacticianPrimed));
      const bestPCCombatant = primedScholar ?? adventurerCombatants.reduce((a,b) => Number(a.actor.system.predatorDice ?? 1) >= Number(b.actor.system.predatorDice ?? 1) ? a : b);
      const bestEnemyCombatant = enemyCombatants.reduce((a,b) => Number(a.actor.system.predatorDice ?? 1) >= Number(b.actor.system.predatorDice ?? 1) ? a : b);
      const bestPC = bestPCCombatant.actor;
      const bestEnemy = bestEnemyCombatant.actor;
      let pcDice = Math.max(1, Number(bestPC.system.predatorDice ?? 1));
      const scarredPredatorBoon = this._scarredBoonCount("predator", bestPC);
      if (scarredPredatorBoon) pcDice += scarredPredatorBoon;
      if (bestPC.system.path === "frogTosser" && bestPC.system.frogWayChoice === "boon" && bestPC.system.frogWayBoon === "predator") pcDice += 1;
      const hollowTongueEncounter = enemyCombatants.some(c => Boolean(c.actor?.system?.isHollowTongue));
      const fearNoEvil = hollowTongueEncounter && bestPC.system.path === "priest" ? 2 : 0;
      if (fearNoEvil) pcDice += fearNoEvil;
      const mountedRiders = adventurerCombatants.filter(c => c.actor?.system?.path === "reptileRider" && Boolean(c.actor.system.reptileMounted)).length;
      if (mountedRiders) pcDice += mountedRiders;
      const legendaryHunters = hollowTongueEncounter ? adventurerCombatants.filter(c => c.actor?.system?.path === "hollowTongueHunter").length : 0;
      if (legendaryHunters) pcDice += legendaryHunters * 2;
      const enemyDice = Math.max(1, Number(bestEnemy.system.predatorDice ?? 1));
      const pcRoll = await (new Roll(`${pcDice}d6`)).evaluate();
      const enemyRoll = await (new Roll(`${enemyDice}d6`)).evaluate();
      let pcResult = Math.max(...(pcRoll.dice[0]?.results?.map(r=>r.result) ?? [pcRoll.total]));
      const enemyResult = Math.max(...(enemyRoll.dice[0]?.results?.map(r=>r.result) ?? [enemyRoll.total]));
      let tacticianSpent = 0;
      if (primedScholar && pcResult !== 1 && pcResult < 6) {
        const available = Number(bestPC.system.karma ?? 0);
        if (available > 0) {
          tacticianSpent = await foundry.applications.api.DialogV2.prompt({window:{title:"Tactician — Spend Karma"},content:`<p>Scholar Predator roll: <strong>${pcResult}</strong>. Spend Karma to raise it? (max ${Math.min(available,6-pcResult)})</p><input type="number" name="spend" value="0" min="0" max="${Math.min(available,6-pcResult)}">`,ok:{label:"Apply",callback:(event,button,dialog)=>Number(dialog.element.querySelector('[name="spend"]').value)||0}}) ?? 0;
          tacticianSpent=Math.max(0,Math.min(Number(tacticianSpent)||0,available,6-pcResult));
          if (tacticianSpent) { pcResult += tacticianSpent; await bestPC.update({"system.karma":available-tacticianSpent}); }
        }
      }

      let state, summary, award = 0;
      const guaranteed = Boolean(this.actor.system.predatorGuaranteed);
      const guaranteedBy = this.actor.system.predatorGuaranteedBy || "an Adventurer";
      if (guaranteed) { state = "win"; summary = `PREDATOR: guaranteed by ${guaranteedBy} spending a Hero Die. Karma and Predator Abilities are available this round.`; }
      else if (pcResult > enemyResult) { state = "win"; summary = "PREDATOR: Karma and Predator Abilities are available this round."; }
      else if (pcResult === enemyResult) { state = "tie"; summary = "TIE: Karma is available, but Predator Abilities are not."; }
      else { state = "loss"; award = enemyResult - pcResult; summary = `PREY: Karma and Predator Abilities are unavailable this round. Each Adventurer gains ${award} Karma.`; }

      const hollows = this._activeHollowThreats();
      for (const combatant of adventurerCombatants) {
        const sourceActor = combatant.actor;
        const incs = this._activeInclinations(sourceActor);
        let karmaAvailable = state !== "loss";
        if (incs.includes("scarred")) karmaAvailable = false;
        if (hollows.hollowTongue && sourceActor.system.path !== "priest") karmaAvailable = false;
        if (hollows.hollowTongue && sourceActor.system.path === "priest") karmaAvailable = true;

        const baseUpdate = {
          "system.predatorState": state,
          "system.karmaAvailable": karmaAvailable,
          "system.predatorAbilityActive": state === "win",
          "system.scholarTacticianPrimed": false
        };
        if (state === "loss" && sourceActor.system.predatorAbility === "crouchingCritter") baseUpdate["system.crouchingCritterPrimed"] = true;

        // Keep both the combat token's synthetic Actor and its world/base Actor in
        // sync. Only award Karma once per Adventurer: each target receives the
        // source actor's new absolute Karma value rather than incrementing itself.
        const newKarma = Number(sourceActor.system.karma ?? 0) + award;
        const targets = this._predatorUpdateTargetsForCombatant(combatant);
        for (const target of targets) {
          const update = {...baseUpdate};
          if (award) update["system.karma"] = newKarma;
          await target.update(update);
        }
      }

      await this.actor.update({"system.predatorRoundStatus": `${summary} (${bestPC.name} ${pcResult} vs ${bestEnemy.name} ${enemyResult})`,"system.predatorGuaranteed":false,"system.predatorGuaranteedBy":""});
      const hollowNote = hollows.hollowTongue ? `<p><strong>Hollow Tongue:</strong> Hero Dice are unavailable, and Karma is locked except for Priests using Righteous Fury.</p>` : hollows.hollowEyes ? `<p><strong>Hollow Eyes:</strong> Hero Dice are unavailable for this encounter.</p>` : "";
      const tacticianNote = primedScholar ? `<p><strong>Tactician:</strong> ${bestPC.name} uses their own Predator Rating${tacticianSpent ? ` and spends ${tacticianSpent} Karma` : ""}.</p>` : "";
      const scaryScalesNote = mountedRiders ? `<p><strong>Scary Scales:</strong> ${mountedRiders} mounted Reptile Rider${mountedRiders===1?" adds":"s add"} ${mountedRiders} Boon${mountedRiders===1?"":"s"} to the party Predator roll.</p>` : "";
      const fearNoEvilNote = fearNoEvil ? `<p><strong>Fear No Evil:</strong> ${bestPC.name} is the Predator roller against a Hollow Tongue and gains +2 Boons.</p>` : "";
      const legendaryNote = legendaryHunters ? `<p><strong>Legendary:</strong> ${legendaryHunters} Hollow Tongue Hunter${legendaryHunters===1?" adds":"s add"} <strong>${legendaryHunters*2} Boon${legendaryHunters*2===1?"":"s"}</strong> to the party Predator roll against Hollow Tongues.</p>` : "";
      const scarredPredatorNote = scarredPredatorBoon ? `<p><strong>Scarred:</strong> ${bestPC.name} adds ${scarredPredatorBoon} chosen Predator Boon${scarredPredatorBoon===1?"":"s"}.</p>` : "";
      const content = `<div class="moss-chat"><h3>Predator Round</h3><p><strong>${bestPC.name}</strong>: ${pcDice}d6 keep highest = <strong>${pcResult}</strong></p><p><strong>${bestEnemy.name}</strong>: ${enemyDice}d6 keep highest = <strong>${enemyResult}</strong></p>${tacticianNote}${scaryScalesNote}${fearNoEvilNote}${legendaryNote}${scarredPredatorNote}<p>${summary}</p>${hollowNote}<p><small>Turn order is unchanged: Adventurers still act before enemies unless surprised.</small></p></div>`;
      await ChatMessage.create({speaker: ChatMessage.getSpeaker({actor: this.actor}), content});
      this.render(false);
    }

    async _recoverCorrupted(actor) {
      if (actor.system.corruptedTransformed) {
        ui.notifications.warn(`${actor.name} has become a Hollow Tongue and cannot use Corrupted daily recovery.`);
        return;
      }
      const roll = await (new Roll("2d6")).evaluate();
      const results = roll.dice[0]?.results?.map(r=>r.result) ?? [];
      const heal = Math.min(...results);
      const current = Number(actor.system.strikes?.value ?? 0);
      const max = Number(actor.system.strikes?.max ?? current);
      await actor.update({"system.strikes.value": Math.min(max, current + heal)});
      await roll.toMessage({speaker: ChatMessage.getSpeaker({actor}), flavor: `<strong>${actor.name} — Corrupted Daily Recovery</strong><br>2d6 keep lowest = <strong>${heal}</strong> Strikes healed.`});
    }

    async _advanceMossMedicDay(adventurers) {
      for (const a of adventurers) {
        const updates = {};
        if (a.system.poisonCurePending) {
          updates["system.poisonMarks"] = 0;
          updates["system.poisonActive"] = false;
          updates["system.poisonTerminal"] = false;
          updates["system.poisonCurePending"] = false;
        }
        if (a.system.path === "mossMedic") {
          updates["system.mossRegrowthUsed"] = false;
          updates["system.mossPrayerUsed"] = false;
        }
        if (a.system.path === "priest") {
          updates["system.priestStone1Charged"] = true;
          updates["system.priestStone2Charged"] = true;
          updates["system.priestMiracleBlessingUsed"] = false;
        }
        if (Object.keys(updates).length) await a.update(updates);
      }
    }

    async _refillMossMedicBags(adventurers) {
      for (const a of adventurers) {
        if (a.system.path === "mossMedic" && Number(a.system.mossBagUses ?? 6) !== 6) {
          await a.update({"system.mossBagUses":6});
        }
      }
    }

    async _refillCombatMedicKits(adventurers, tier) {
      if (Number(tier) < 2) return;
      for (const a of adventurers) {
        if (a.system.path === "combatMedic" && Number(a.system.medKitUses ?? 6) !== 6) {
          await a.update({"system.medKitUses":6});
        }
      }
    }

    async _refillHarvesterKits(adventurers, tier) {
      if (Number(tier) < 2) return;
      for (const a of adventurers) {
        if (a.system.path === "harvester" && Number(a.system.poisonKitUses ?? 6) !== 6) {
          await a.update({"system.poisonKitUses":6});
        }
      }
    }

    async _restWithSupply() {
      const supplies = Number(this.actor.system.supplies?.value ?? 0);
      if (supplies <= 0) return ui.notifications.warn("The party has no Supplies. Use Night Without Supplies instead.");
      const adventurers = this._playerAdventurers();
      await this._advanceMossMedicDay(adventurers);
      await this.actor.update({"system.supplies.value": supplies - 1});
      for (const a of adventurers) {
        if (a.system.path === "corrupted") await this._recoverCorrupted(a);
        else if ([a.system.activeSammichPreset,a.system.activeSammichSecondaryPreset].includes("ghostPepper")) {
          // Ghost Pepper Stack blocks healing until the following day.
        } else {
          const current = Number(a.system.strikes?.value ?? 0), max = Number(a.system.strikes?.max ?? current);
          await a.update({"system.strikes.value": Math.min(max, current + 1)});
        }
      }
      await ChatMessage.create({speaker: ChatMessage.getSpeaker({actor: this.actor}), content: `<div class="moss-chat"><h3>Full Night's Rest</h3><p>Spent <strong>1 Supply</strong>. Each normal Adventurer restores <strong>1 Strike</strong>. Corrupted Adventurers use their special daily recovery instead.</p></div>`});
      this.render(false);
    }

    async _clearTravelPenaltyEffects(adventurers) {
      const damaged = Boolean(this.actor.system.damagedEquipmentApplied);
      const hungerStacks = Number(this.actor.system.hungerStacks ?? 0);
      const hadPenalties = Boolean(String(this.actor.system.supplyPenalties ?? "").trim()) || damaged || hungerStacks > 0;

      // Clear the Party record first so the Active Supply Penalties box cannot retain stale text
      // while Adventurer penalty effects are being restored.
      await this.actor.update({
        "system.supplyPenalties": "",
        "system.damagedEquipmentApplied": false,
        "system.hungerStacks": 0
      });

      for (const a of adventurers) {
        const updates = {"system.supplyEffects": {fatigued:false,noAmmo:false,damagedEquipment:false,brokenSpirits:false,faithless:false,hunger:0}};
        if (damaged && !a.system.damagedEquipmentCritVulnerable) updates["system.armorSave"] = Math.max(2, Number(a.system.armorSave ?? 6) - 1);
        updates["system.damagedEquipmentCritVulnerable"] = false;
        const suppressed = String(a.system.suppressedInclination ?? "");
        updates["system.suppressedInclination"] = "";
        if (suppressed === "toughHide") {
          updates["system.strikes.max"] = Number(a.system.strikes?.max ?? 0) + 1;
          updates["system.strikes.value"] = Math.min(Number(a.system.strikes?.value ?? 0), Number(updates["system.strikes.max"]));
        }
        if (suppressed === "predator") updates["system.predatorDice"] = Number(a.system.predatorDice ?? 1) + 1;
        if (hungerStacks) {
          const restoredMax = Number(a.system.strikes?.max ?? 0) + hungerStacks;
          updates["system.strikes.max"] = restoredMax;
          updates["system.strikes.value"] = Math.min(Number(a.system.strikes?.value ?? 0), restoredMax);
        }
        await a.update(updates);
      }
      return hadPenalties;
    }

    async _safeZoneRest() {
      const tier = Number(this.actor.system.safeZoneTier ?? 0);
      if (tier < 1) return ui.notifications.warn("Set the Safe Zone Tier to 1, 2, or 3 first.");
      const adventurers = this._playerAdventurers();
      await this._advanceMossMedicDay(adventurers);
      await this._refillMossMedicBags(adventurers);
      await this._refillCombatMedicKits(adventurers, tier);
      await this._refillHarvesterKits(adventurers, tier);
      const clearedPenalties = await this._clearTravelPenaltyEffects(adventurers);
      for (const a of adventurers) {
        if (a.system.path === "corrupted") await this._recoverCorrupted(a);
        else if ([a.system.activeSammichPreset,a.system.activeSammichSecondaryPreset].includes("ghostPepper")) {
          // Ghost Pepper Stack blocks healing until the following day.
        } else await a.update({"system.strikes.value": Number(a.system.strikes?.max ?? a.system.strikes?.value ?? 0)});
      }
      await ChatMessage.create({speaker: ChatMessage.getSpeaker({actor:this.actor}), content:`<div class="moss-chat"><h3>Safe Zone Rest</h3><p>${clearedPenalties ? "Travel penalties are cleared." : "There were no active travel penalties."} Normal Adventurers completely restore Strikes. Corrupted Adventurers use their daily recovery instead.</p></div>`});
      if (clearedPenalties) ui.notifications.info("Moss & Stone: Active Supply Penalties cleared at the Safe Zone.");
      this.render(false);
    }

    async _resupplyAtSafeZone() {
      const tier = Number(this.actor.system.safeZoneTier ?? 0);
      const caps = {1:2,2:4,3:10};
      const cap = caps[tier];
      if (!cap) return ui.notifications.warn("Set the Safe Zone Tier to 1, 2, or 3 first.");
      const adventurers = this._playerAdventurers();
      await this._refillMossMedicBags(adventurers);
      await this._refillCombatMedicKits(adventurers, tier);
      await this._refillHarvesterKits(adventurers, tier);
      const riders = adventurers.filter(a => a.system.path === "reptileRider").length;
      const saddleBonus = riders * 2;
      const target = cap + saddleBonus;
      const oldMax = Number(this.actor.system.supplies?.max ?? 10);
      const newMax = Math.max(oldMax, target);
      await this.actor.update({"system.supplies.value": target, "system.supplies.max": newMax});
      ui.notifications.info(`Tier ${tier} Safe Zone resupplied the party to ${target} Supplies${saddleBonus ? ` (${saddleBonus} extra from Saddle Bags)` : ""}.`);
      this.render(false);
    }

    async _nightWithoutSupplies() {
      if (Number(this.actor.system.supplies?.value ?? 0) > 0) return ui.notifications.warn("The party still has Supplies. Spend them on Rest with Supply first.");
      const adventurers = this._playerAdventurers();
      await this._advanceMossMedicDay(adventurers);
      const existing = String(this.actor.system.supplyPenalties ?? "").split("\n").filter(Boolean);
      const labels = ["Fatigued", "No Ammo", "Damaged Equipment", "Broken Spirits", "Faithless", "Hunger"];
      let roll, result, label, tries=0;
      do {
        roll = await (new Roll("1d6")).evaluate();
        result = roll.total;
        label = labels[result-1];
        tries++;
      } while (result !== 6 && existing.some(x => x.startsWith(label)) && tries < 20);
      existing.push(`${label}${result===6 && Number(this.actor.system.hungerStacks ?? 0)>0 ? ` (${Number(this.actor.system.hungerStacks ?? 0)+1})` : ""}`);
      const partyUpdates = {"system.supplyPenalties": existing.join("\n")};
      if (result === 3 && !this.actor.system.damagedEquipmentApplied) partyUpdates["system.damagedEquipmentApplied"] = true;
      if (result === 6) partyUpdates["system.hungerStacks"] = Number(this.actor.system.hungerStacks ?? 0) + 1;
      await this.actor.update(partyUpdates);
      for (const a of adventurers) {
        const e = foundry.utils.deepClone(a.system.supplyEffects ?? {fatigued:false,noAmmo:false,damagedEquipment:false,brokenSpirits:false,faithless:false,hunger:0});
        const updates = {};
        if (result===1) e.fatigued=true;
        if (result===2) e.noAmmo=true;
        if (result===3 && !e.damagedEquipment) { e.damagedEquipment=true; const currentArmor=Number(a.system.armorSave ?? 6); if (currentArmor >= 6) updates["system.damagedEquipmentCritVulnerable"] = true; else updates["system.armorSave"] = currentArmor+1; }
        if (result===4) {
          e.brokenSpirits=true;
          if (!a.system.suppressedInclination) {
            const lost = this._allInclinations(a)[0] ?? "";
            updates["system.suppressedInclination"] = lost;
            if (lost === "toughHide") { const mx=Math.max(0,Number(a.system.strikes?.max??0)-1); updates["system.strikes.max"]=mx; updates["system.strikes.value"]=Math.min(Number(a.system.strikes?.value??0),mx); }
            if (lost === "predator") updates["system.predatorDice"] = Math.max(1,Number(a.system.predatorDice??1)-1);
          }
        }
        if (result===5) e.faithless=true;
        if (result===6) { e.hunger=Number(e.hunger??0)+1; const newMax=Math.max(0,Number(a.system.strikes?.max??0)-1); updates["system.strikes.max"]=newMax; updates["system.strikes.value"]=Math.min(Number(a.system.strikes?.value??0),newMax); }
        updates["system.supplyEffects"] = e;
        await a.update(updates);
        if (a.system.path === "corrupted") await this._recoverCorrupted(a);
      }
      const detail = {1:"Strength-related tasks and melee attacks gain 1 Bane.",2:"Ranged attacks are impossible.",3:"Armor Save target worsens by +1. If already at 6, remember enemies can crit on 5+.",4:"Each Adventurer loses 1 Inclination of their choice until a Safe Zone.",5:"Hero Dice cannot be rolled until a Safe Zone.",6:"Maximum Strikes are reduced by 1. Hunger may stack."}[result];
      await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}), flavor:`<strong>Night Without Supplies</strong><br>Penalty: <strong>${label}</strong><br>${detail}<br><small>Duplicate non-Hunger penalties are rerolled automatically.</small>`});
      this.render(false);
    }

    async _rollCheck(label, dice, keep) {
      dice = Math.max(1, Number(dice) || 1);
      const formula = dice > 1 ? `${dice}d6${keep === "low" ? "kl1" : "kh1"}` : "1d6";
      const roll = await (new Roll(formula)).evaluate();
      const results = roll.dice[0]?.results?.map(r => r.result) ?? [roll.total];
      const kept = keep === "low" ? Math.min(...results) : Math.max(...results);
      const mode = dice > 1 ? (keep === "low" ? "keep lowest" : "keep highest") : "single die";
      await roll.toMessage({speaker: ChatMessage.getSpeaker({actor: this.actor}), flavor: mossCard(label, `<p>${mode}: <strong>${kept}</strong></p>`)});
    }

    async _rollUntargetedPool(label, boons = 0, banes = 0, notes = []) {
      const net = Number(boons) - Number(banes);
      const diceCount = 1 + Math.abs(net);
      const keep = net < 0 ? "low" : "high";
      const formula = diceCount > 1 ? `${diceCount}d6${keep === "low" ? "kl1" : "kh1"}` : "1d6";
      const roll = await (new Roll(formula)).evaluate();
      const results = roll.dice[0]?.results?.map(r => r.result) ?? [roll.total];
      const result = keep === "low" ? Math.min(...results) : Math.max(...results);
      const poolText = net === 0 ? "1d6" : net > 0 ? `${diceCount}d6 keep highest (${net} Boon${net === 1 ? "" : "s"})` : `${diceCount}d6 keep lowest (${Math.abs(net)} Bane${Math.abs(net) === 1 ? "" : "s"})`;
      const noteText = notes?.length ? `<br><small>${notes.join(" • ")}</small>` : "";
      await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:mossCard(label, `<p>${poolText}; kept <strong>${result}</strong></p>${noteText}`)});
      return {roll,result,net};
    }

    async _rollTargetPool(label, target, boons = 0, banes = 0, notes = []) {
      const net = Number(boons) - Number(banes);
      const diceCount = 1 + Math.abs(net);
      const keep = net < 0 ? "low" : "high";
      const formula = diceCount > 1 ? `${diceCount}d6${keep === "low" ? "kl1" : "kh1"}` : "1d6";
      const roll = await (new Roll(formula)).evaluate();
      const results = roll.dice[0]?.results?.map(r => r.result) ?? [roll.total];
      const result = keep === "low" ? Math.min(...results) : Math.max(...results);
      const success = result === 1 ? false : (result === 6 ? true : result >= target);
      const poolText = net === 0 ? "1d6" : net > 0 ? `${diceCount}d6 keep highest (${net} Boon${net === 1 ? "" : "s"})` : `${diceCount}d6 keep lowest (${Math.abs(net)} Bane${Math.abs(net) === 1 ? "" : "s"})`;
      const noteText = notes?.length ? `<br><small>${notes.join(" • ")}</small>` : "";
      await roll.toMessage({speaker: ChatMessage.getSpeaker({actor: this.actor}), flavor: mossCard(label, `<p>Target <strong>${target}+</strong></p><p>${poolText}; kept <strong>${result}</strong></p><p class="moss-result ${success ? "success" : "failure"}">${success ? "SUCCESS" : "FAILURE"}</p>${noteText}`, success ? "success" : "danger")});
      return {roll,result,success,net};
    }

    async _rollTarget(label, target, note = "") {
      const roll = await (new Roll("1d6")).evaluate();
      const result = roll.total;
      const success = result === 1 ? false : (result === 6 ? true : result >= target);
      await roll.toMessage({speaker: ChatMessage.getSpeaker({actor: this.actor}), flavor: mossCard(label, `<p>Target <strong>${target}+</strong></p><p class="moss-result ${success ? "success" : "failure"}">${success ? "SUCCESS" : "FAILURE"}</p>${note ? `<small>${note}</small>` : ""}`, success ? "success" : "danger")});
    }


    async _onItemUse(event) {
      event.preventDefault(); event.stopPropagation();
      const id=event.currentTarget.dataset.itemUse;
      const item=this.actor.items.get(id);
      if (!item) return;
      if (item.type === "whisperStone") {
        if (item.system.drained) return ui.notifications.warn(`${item.name} is already drained.`);
        if (this.actor.system.path === "priest" && !item.system.identified) {
          const chosen = await this._priestChooseRandomWhisperEffect(item.system.preset);
          if (chosen && chosen !== item.system.preset) {
            const data = WHISPER_STONES[chosen] ?? WHISPER_STONES[""];
            await item.update({"system.preset":chosen,"system.description":data.description ?? "","system.table":Number(data.table ?? 0),"system.row":Number(data.row ?? 0),"name":data.label});
          }
        }
        let preserved=false;
        let scholarText="";
        if (this.actor.system.path === "scholar") {
          const roll=await (new Roll("1d6")).evaluate();
          preserved=Number(roll.total)===6;
          scholarText=`<br><strong>I Read the Manual:</strong> rolled ${roll.total} — ${preserved ? "the Whisper Stone is not consumed." : "the Whisper Stone is drained."}`;
        }
        const automationText = await this._applyWhisperStoneEffect(item.system.preset);
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<div class="moss-chat"><h3>${this.actor.name} uses ${item.name}</h3><p>${item.system.description || "The stone's power is revealed."}</p>${automationText ? `<p><strong>Automated:</strong> ${automationText}</p>` : ""}${scholarText}</div>`});
        await item.update({"system.identified":true,"system.drained":preserved ? false : true});
        this.render(false);
        return;
      }
      if (item.type === "sammich") {
        if (this.actor.system.path === "corrupted") return ui.notifications.warn(`${this.actor.name} is Corrupted. Not the Same Critter prevents consumable items such as Sammiches from affecting them.`);
        let name=item.name;
        let effect=item.system.description || "";
        if (item.system.preset === "mysteryMeat") {
          const keys=Object.keys(SAMMICHES).filter(k => k && k !== "mysteryMeat");
          const first=keys[Math.floor(Math.random()*keys.length)];
          let second=keys[Math.floor(Math.random()*keys.length)];
          if (keys.length>1) while(second===first) second=keys[Math.floor(Math.random()*keys.length)];
          const a=SAMMICHES[first], b=SAMMICHES[second];
          effect=`Mystery Meat effects:\n• ${a.label}: ${a.description}\n• ${b.label}: ${b.description}`;
          name=`Mystery Meat (${a.label} + ${b.label})`;
        }
        let primaryPreset=item.system.preset || "";
        let secondaryPreset="";
        if (item.system.preset === "mysteryMeat") {
          const match=name.match(/^Mystery Meat \((.+) \+ (.+)\)$/);
          if (match) {
            primaryPreset=Object.entries(SAMMICHES).find(([,d])=>d.label===match[1])?.[0] || "";
            secondaryPreset=Object.entries(SAMMICHES).find(([,d])=>d.label===match[2])?.[0] || "";
          }
        }
        await this._clearCurrentSammichEffects(false);
        await this.actor.update({"system.activeSammichName":name,"system.activeSammichEffect":effect,"system.activeSammichPreset":primaryPreset,"system.activeSammichSecondaryPreset":secondaryPreset,"system.sammich":`${name}\n${effect}`});
        const automated=await this._applySammichEffects([primaryPreset,secondaryPreset].filter(Boolean));
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<div class="moss-chat"><h3>${this.actor.name} eats ${item.name}</h3><p>${effect.replace(/\n/g,"<br>")}</p>${automated ? `<p><strong>Automated:</strong> ${automated}</p>` : ""}<small>This replaces any previous Sammich effect for the day.</small></div>`});
        await item.delete();
        this.render(false);
        return;
      }
      if (item.type === "tinkerTool") {
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<div class="moss-chat"><h3>${this.actor.name} uses ${item.name}</h3><p>${item.system.description || "No description."}</p></div>`});
      }
    }

    _activeSammichPresets() {
      return [this.actor.system.activeSammichPreset, this.actor.system.activeSammichSecondaryPreset].filter(Boolean);
    }

    _healingBlocked(actor=this.actor) {
      return [actor.system.activeSammichPreset, actor.system.activeSammichSecondaryPreset].includes("ghostPepper");
    }

    async _applyWhisperStoneEffect(preset) {
      if (!preset) return "";
      if (preset === "healing") {
        const adventurers=this._playerAdventurers();
        let healed=0, poisonCleared=0, blocked=0;
        for (const a of adventurers) {
          const updates={};
          if (a.system.path !== "corrupted" && (a.system.poisonActive || Number(a.system.poisonMarks??0)>0 || a.system.poisonTerminal)) {
            updates["system.poisonMarks"]=0; updates["system.poisonActive"]=false; updates["system.poisonTerminal"]=false; poisonCleared++;
          }
          if (a.system.path !== "corrupted" && !this._healingBlocked(a)) {
            const cur=Number(a.system.strikes?.value??0), max=Number(a.system.strikes?.max??cur);
            if (cur<max) { updates["system.strikes.value"]=Math.min(max,cur+1); healed++; }
          } else if (this._healingBlocked(a)) blocked++;
          if (Object.keys(updates).length) await a.update(updates);
        }
        return `Party healing applied: ${healed} Adventurer${healed===1?"":"s"} restored 1 Strike; Poison cleared from ${poisonCleared}. ${blocked ? `${blocked} healing effect${blocked===1?" was":"s were"} blocked by Ghost Pepper Stack.` : ""}`;
      }
      if (preset === "lucky") {
        await this.actor.update({"system.whisperEffects.lucky":true});
        return "+1 Boon on this Adventurer's checks for the scene. Use Clear Item Scene Effects when the scene ends.";
      }
      if (preset === "protection") {
        const adventurers=this._playerAdventurers();
        for (const a of adventurers) await a.update({"system.whisperEffects.protection":true});
        return "Protection applied to the party. Each Adventurer's next failed Armor Save is absorbed, then their protection ends.";
      }
      return "";
    }

    async _clearCurrentSammichEffects(clearDisplay=true) {
      const bonus=Number(this.actor.system.sammichTempStrikeBonus??0);
      const updates={"system.sammichTempStrikeBonus":0};
      if (bonus>0) {
        const oldMax=Number(this.actor.system.strikes?.max??0);
        const newMax=Math.max(0,oldMax-bonus);
        updates["system.strikes.max"]=newMax;
        updates["system.strikes.value"]=Math.min(Number(this.actor.system.strikes?.value??0),newMax);
      }
      if (clearDisplay) {
        updates["system.activeSammichName"]="";
        updates["system.activeSammichEffect"]="";
        updates["system.activeSammichPreset"]="";
        updates["system.activeSammichSecondaryPreset"]="";
        updates["system.sammich"]="";
      }
      await this.actor.update(updates);
    }

    async _applySammichEffects(presets) {
      const applied=[];
      if (presets.includes("egg")) {
        const bonus=2;
        const max=Number(this.actor.system.strikes?.max??0), cur=Number(this.actor.system.strikes?.value??0);
        await this.actor.update({"system.strikes.max":max+bonus,"system.strikes.value":cur+bonus,"system.sammichTempStrikeBonus":bonus});
        applied.push("Egg Sammich added +2 temporary Strikes");
      }
      if (presets.includes("froggyFlatbread") && (this.actor.system.poisonActive || Number(this.actor.system.poisonMarks??0)>0 || this.actor.system.poisonTerminal)) {
        await this.actor.update({"system.poisonMarks":0,"system.poisonActive":false,"system.poisonTerminal":false});
        applied.push("Froggy Flatbread removed existing Poison and grants immunity for the day");
      }
      if (presets.includes("champion")) applied.push("Champion Sammich will add 1 Boon to Miraculous Saves");
      if (presets.includes("cloverClub")) applied.push("Clover Club will confirm crits on 5+");
      if (presets.includes("ghostPepper")) applied.push("Ghost Pepper Stack makes attacks auto-hit and blocks healing");
      return applied.join("; ");
    }

    async _onSammichAction(event) {
      event.preventDefault();
      const action=event.currentTarget.dataset.sammichAction;
      const presets=this._activeSammichPresets();
      if (action === "gyro") {
        if (!presets.includes("gyro")) return;
        const karma=Number(this.actor.system.karma??0);
        if (karma<3) return ui.notifications.warn("You need 3 Karma to convert it into 1 Hero Die.");
        await this.actor.update({"system.karma":karma-3,"system.heroDice":Number(this.actor.system.heroDice??0)+1});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}),content:`<div class="moss-chat"><h3>Gyro</h3><p>${this.actor.name} spends 3 Karma and gains 1 Hero Die.</p></div>`});
      }
      if (action === "habenero") {
        if (!presets.includes("habenero")) return;
        const roll=await (new Roll("1d6")).evaluate();
        const hurt=Number(roll.total)===1;
        if (hurt) await this.actor.update({"system.strikes.value":Math.max(0,Number(this.actor.system.strikes?.value??0)-1)});
        await roll.toMessage({speaker:ChatMessage.getSpeaker({actor:this.actor}),flavor:`<strong>Hollerin' Habenero Hoagie — Extra Attack</strong><br>${hurt ? "Rolled 1: take <strong>1 Strike</strong>." : "No self-damage."}<br><small>You may now make the extra attack using the normal Attack controls.</small>`});
      }
      this.render(false);
    }

    async _clearItemSceneEffects(event) {
      event?.preventDefault?.();
      await this.actor.update({"system.whisperEffects.lucky":false,"system.whisperEffects.protection":false});
      this.render(false);
    }

    async _onItemDelete(event) {
      event.preventDefault(); event.stopPropagation();
      const item=this.actor.items.get(event.currentTarget.dataset.itemDelete);
      if (!item) return;
      const ok=await Dialog.confirm({title:`Delete ${item.name}?`,content:`<p>Remove <strong>${item.name}</strong> from ${this.actor.name}?</p>`});
      if (ok) await item.delete();
    }

    async _clearSammich(event) {
      event.preventDefault();
      await this._clearCurrentSammichEffects(true);
      this.render(false);
    }

    async _onAdjust(event) {
      event.preventDefault();
      event.stopPropagation();
      const path = event.currentTarget.dataset.adjust;
      const delta = Number(event.currentTarget.dataset.delta || 0);
      if (!path || !delta) return;
      const current = foundry.utils.getProperty(this.actor.system, path);
      let value = Number(current ?? 0) + delta;
      if (path === "strikes.value") {
        const max = Number(this.actor.system.strikes?.max ?? value);
        value = Math.max(0, Math.min(value, max));
      }
      if (path === "poisonMarks") value = Math.max(0, Math.min(3, value));
      if (["karma", "heroDice", "supplies.value"].includes(path)) value = Math.max(0, value);
      await this.actor.update({[`system.${path}`]: value});
      if (path === "strikes.value" && value <= 0 && this.actor.type === "adventurer" && this.actor.system.path === "corrupted" && !this.actor.system.corruptedTransformed) {
        await this.actor.update({"system.corruptedTransformed":true});
        await ChatMessage.create({speaker:ChatMessage.getSpeaker({actor:this.actor}), content:mossCard("A Deal Kept", `<p><strong>${this.actor.name}</strong> has reached 0 Strikes and becomes a Hollow Tongue. The character is no longer under player control.</p>`, "danger")});
      }
    }
  }

  Items.unregisterSheet("core", ItemSheet, {types:["whisperStone","sammich","tinkerTool"]});
  Items.registerSheet(SYSTEM_ID, MossAndStoneItemSheet, {types:["whisperStone","sammich","tinkerTool"], makeDefault:true, label:"Moss and Stone Item Sheet"});

  Actors.unregisterSheet("core", ActorSheet, {types: ["adventurer", "enemy", "party"]});
  Actors.registerSheet(SYSTEM_ID, MossAndStoneActorSheet, {types: ["adventurer", "enemy", "party"], makeDefault: true, label: "Moss and Stone Sheet"});
});

// v0.11.1 — Adventurers should use linked tokens so double-clicking a token
// opens/edits the same world Actor sheet. Enemies remain unlinked so multiple
// copies can track their own Strikes and conditions independently.
Hooks.on("preCreateActor", (actor) => {
  if (actor.type === "adventurer") actor.updateSource({prototypeToken: {actorLink: true}});
  if (actor.type === "enemy") actor.updateSource({prototypeToken: {actorLink: false}});
});

async function ensurePrototypeTokenDefaults() {
  if (!game.user?.isGM) return;
  const updates = [];
  for (const actor of game.actors ?? []) {
    if (actor.type === "adventurer" && !actor.prototypeToken?.actorLink) {
      updates.push(actor.update({"prototypeToken.actorLink": true}));
    }
    if (actor.type === "enemy" && actor.prototypeToken?.actorLink) {
      updates.push(actor.update({"prototypeToken.actorLink": false}));
    }
  }
  if (updates.length) await Promise.all(updates);
}

async function ensureStarterItemFolder(name) {
  let folder = game.folders?.find(f => f.type === "Item" && f.name === name && !f.folder);
  if (!folder) folder = await Folder.create({name, type: "Item"});
  return folder;
}

function starterItemExists(type, preset) {
  return game.items?.some(i => i.type === type && i.system?.preset === preset) ?? false;
}

async function installStarterItems() {
  if (!game.user?.isGM) return;

  const installedVersion = game.settings.get(SYSTEM_ID, "starterItemLibraryVersion");
  if (installedVersion === STARTER_ITEM_LIBRARY_VERSION) return;

  const folders = {
    whisperStone: await ensureStarterItemFolder("Moss & Stone — Whisper Stones"),
    sammich: await ensureStarterItemFolder("Moss & Stone — Sammiches"),
    tinkerTool: await ensureStarterItemFolder("Moss & Stone — Tinker Tools")
  };

  const catalogs = [
    ["whisperStone", WHISPER_STONES],
    ["sammich", SAMMICHES],
    ["tinkerTool", TINKER_TOOLS]
  ];

  let created = 0;
  for (const [type, catalog] of catalogs) {
    for (const [preset, data] of Object.entries(catalog)) {
      if (!preset || starterItemExists(type, preset)) continue;

      const system = {
        preset,
        description: data.description ?? ""
      };

      if (type === "whisperStone") {
        Object.assign(system, {
          identified: false,
          drained: false,
          table: Number(data.table ?? 0),
          row: Number(data.row ?? 0)
        });
      } else if (type === "sammich") {
        Object.assign(system, {
          table: Number(data.table ?? 0),
          row: Number(data.row ?? 0)
        });
      } else if (type === "tinkerTool") {
        Object.assign(system, {
          tier: Number(data.tier ?? 1),
          row: Number(data.row ?? 0)
        });
      }

      await Item.create({
        name: data.label,
        type,
        folder: folders[type]?.id ?? null,
        system,
        flags: {
          [SYSTEM_ID]: {
            starterItem: true,
            preset
          }
        }
      });
      created += 1;
    }
  }

  await game.settings.set(SYSTEM_ID, "starterItemLibraryVersion", STARTER_ITEM_LIBRARY_VERSION);
  if (created > 0) {
    ui.notifications?.info(`Moss & Stone: added ${created} starter items to the Items directory.`);
  }
}

Hooks.once("ready", async () => {
  try {
    await ensurePrototypeTokenDefaults();
    await installStarterItems();
  } catch (error) {
    console.error("Moss and Stone | Failed to install starter items", error);
    if (game.user?.isGM) ui.notifications?.error("Moss & Stone could not finish creating the starter item library. Check the console for details.");
  }
});

