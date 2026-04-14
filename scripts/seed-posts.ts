import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "War & Conflict", slug: "war", color: "#DC2626" },
  { name: "International Politics", slug: "international-politics", color: "#2563EB" },
  { name: "Diplomacy", slug: "diplomacy", color: "#059669" },
  { name: "Military & Defense", slug: "military", color: "#7C3AED" },
  { name: "Geopolitics", slug: "geopolitics", color: "#D97706" },
];

const posts = [
  {
    title: "Russia-Ukraine Frontline Shifts as Winter Offensive Stalls Near Donetsk",
    slug: "russia-ukraine-frontline-shifts-winter-offensive-stalls",
    category: "war",
    excerpt: "Heavy fighting continues along the eastern front as both sides dig in for a prolonged winter campaign, with neither gaining decisive ground.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=630&fit=crop",
    source: "Global Affairs Wire",
    content: `<h2>Russia-Ukraine Frontline Shifts as Winter Offensive Stalls Near Donetsk</h2>

<p>The latest phase of the Russia-Ukraine conflict has seen fierce combat along a 120-kilometer stretch of the eastern front, with both armies struggling for control of strategically vital positions near Donetsk. Military analysts report that the anticipated winter offensive has largely stalled, with neither side able to achieve a decisive breakthrough despite months of preparation and massive resource expenditure.</p>

<p>The conflict, now stretching well beyond its third year, has settled into a grinding war of attrition that bears an uncomfortable resemblance to the trench warfare of the First World War. Both sides have constructed elaborate defensive networks featuring reinforced bunkers, layered minefields, and interlocking fields of fire that make any advance extraordinarily costly in both men and materiel.</p>

<h3>Tactical Developments on the Ground</h3>

<p>Ukrainian forces have reinforced defensive lines around key supply routes, deploying additional engineering units to fortify positions in depth. The strategy reflects a pragmatic assessment that holding territory is currently more achievable than recapturing it, particularly given the ammunition constraints that have periodically hampered offensive operations throughout the year.</p>

<p>Russian units, meanwhile, have shifted to smaller, more focused assaults on fortified positions, abandoning the costly human-wave tactics that characterized earlier phases of the conflict. These "storm group" tactics involve small teams of infantry, typically 10-20 soldiers, supported by heavy artillery preparation and close air support from Ka-52 attack helicopters.</p>

<p>Drone warfare continues to play a central and increasingly sophisticated role, with both sides deploying thousands of unmanned systems daily to conduct reconnaissance, precision strikes, and even logistical resupply to forward positions. First-person-view (FPV) kamikaze drones have become perhaps the single most lethal weapon system on the battlefield, accounting for an estimated 30-40% of all vehicle kills.</p>

<p>"The front has become remarkably static in the traditional sense, but the intensity of combat operations remains extremely high," said Colonel (ret.) Maria Kowalski, a military analyst at the European Defence Institute. "Both sides are suffering significant attrition without corresponding territorial gains. This is a war of exhaustion, and the question is which side can sustain losses longer."</p>

<h3>The Artillery Question</h3>

<p>Artillery remains the dominant killer on the eastern front, with both sides firing thousands of rounds daily. Russia has ramped up domestic production of 152mm shells and secured additional supplies from allied nations, partially offsetting earlier shortages. Ukraine, meanwhile, has benefited from increased Western production of 155mm NATO-standard ammunition, though delivery timelines and logistics remain persistent challenges.</p>

<p>The introduction of precision-guided munitions, including GPS-guided Excalibur rounds and GLSDB glide bombs, has given Ukrainian forces a qualitative edge in certain engagements. However, Russian electronic warfare units have proven adept at jamming GPS signals, forcing a continuous cat-and-mouse game between precision and disruption.</p>

<h3>International Implications and Diplomatic Efforts</h3>

<p>Western allies are debating the next tranche of military aid, with some voices calling for increased support — including longer-range missile systems and advanced air defense platforms — while others urge a diplomatic offramp before the conflict freezes into a permanent stalemate. The European Union is preparing its 15th sanctions package against Russia, targeting energy revenues, dual-use technology exports, and the financial networks that support Russia's military-industrial complex.</p>

<p>Several neutral nations have proposed peace frameworks, though none has gained traction with both belligerents. The fundamental obstacle remains irreconcilable positions on territorial sovereignty: Ukraine insists on restoration of its internationally recognized borders, while Russia considers the annexed regions non-negotiable.</p>

<h3>Humanitarian Situation Deteriorates</h3>

<p>Civilian evacuations continue from frontline settlements as temperatures drop well below freezing. International aid organizations warn of a growing humanitarian crisis, with damaged infrastructure leaving millions without reliable heating, electricity, or clean water. Schools and hospitals in Donetsk and Zaporizhzhia oblasts are operating at minimal capacity, and the psychological toll on civilian populations — particularly children — is described by UNICEF as "catastrophic and generational."</p>

<p>As the conflict grinds on with no resolution in sight, the international community faces difficult questions about the sustainability of support, the prospects for negotiation, and the long-term consequences of a protracted war in the heart of Europe.</p>`,
  },
  {
    title: "NATO Allies Boost Defense Spending to Record Levels Amid Global Tensions",
    slug: "nato-allies-boost-defense-spending-record-levels",
    category: "military",
    excerpt: "Alliance members collectively surpass the 2% GDP target for the first time as escalating threats reshape defense priorities across Europe and beyond.",
    image: "https://images.unsplash.com/photo-1580752300992-559f8e0734e0?w=1200&h=630&fit=crop",
    source: "Defense Weekly",
    content: `<h2>NATO Allies Boost Defense Spending to Record Levels Amid Global Tensions</h2>

<p>In a historic shift that underscores the transformed security landscape of the 2020s, NATO member states have collectively surpassed the long-debated 2% of GDP defense spending target for the first time in the alliance's 77-year history. The surge in military budgets reflects growing anxiety over persistent conflicts in Europe, rising tensions in the Indo-Pacific, and an increasingly volatile Middle East that has upended assumptions about the post-Cold War peace dividend.</p>

<p>The milestone, announced at NATO headquarters in Brussels, represents a dramatic reversal from just a decade ago, when only a handful of alliance members met the target and many treated it as an aspirational guideline rather than a firm commitment. Today, 28 of 32 member states have reached or exceeded the threshold, with the remaining four on track to do so within the next fiscal year.</p>

<h3>A New Era of European Rearmament</h3>

<p>Germany, once criticized for its anemic defense budget and the poor readiness of its Bundeswehr, has emerged as a leader in the rearmament push. The €100 billion special fund announced in the wake of the Ukraine invasion has been fully committed to procurement programs, including new F-35 stealth fighters, heavy armor, advanced naval vessels, and a next-generation integrated air and missile defense system developed in partnership with France and Italy.</p>

<p>"The Zeitenwende was not a slogan — it was a strategic necessity," said the German Defense Minister, referencing Chancellor Scholz's historic 2022 speech. "We are rebuilding the Bundeswehr to be the backbone of European conventional deterrence, and we will not stop at 2%. The threat environment demands more."</p>

<p>Poland continues to maintain the alliance's highest proportional spending at 4.2% of GDP, cementing its position as a regional military power. Its ambitious modernization program includes the acquisition of Korean K2 main battle tanks, American HIMARS rocket artillery systems, and a comprehensive overhaul of its air force with F-35 and FA-50 aircraft. With over 200,000 active-duty personnel planned by 2028, Poland's military will be among the largest in Europe.</p>

<p>The Baltic states — Estonia, Latvia, and Lithuania — have fast-tracked acquisitions of advanced air defense systems, including NASAMS and IRIS-T platforms, and have collectively invested in fortifying their eastern borders with physical barriers, surveillance networks, and pre-positioned ammunition depots.</p>

<h3>Modernization Priorities Across the Alliance</h3>

<p>Spending increases across the alliance are being directed toward five priority areas identified in NATO's most recent capability review: integrated air and missile defense, precision-guided munitions and deep-strike capability, ammunition stockpiles and industrial surge capacity, cyber and space operations, and autonomous systems including combat drones.</p>

<p>The alliance has also established a new Innovation Accelerator, modeled partly on DARPA, to fast-track the development and deployment of emerging technologies including artificial intelligence, quantum computing, and hypersonic weapons. Several nations have committed to establishing new forward-deployed combat brigades along NATO's eastern flank, collectively forming a "shield force" designed to deter aggression through visible, credible defensive capability.</p>

<h3>Industrial Base Challenges</h3>

<p>Despite the surge in spending commitments, defense industrial capacity remains a significant bottleneck. Years of underinvestment have left many European defense manufacturers unable to ramp up production quickly enough to meet demand. Delivery timelines for major platforms — tanks, aircraft, ships — stretch five to ten years, and even ammunition production has struggled to keep pace with consumption rates observed in Ukraine.</p>

<p>"Money is necessary but not sufficient," cautioned a senior NATO official speaking on background. "We need to expand and diversify our industrial base, streamline procurement processes, and invest in the workforce. This is a generational effort, not a one-time spending increase."</p>

<h3>Transatlantic Unity and Strain</h3>

<p>The spending milestone has been welcomed in Washington, where successive administrations have pressured European allies to shoulder a greater share of the collective defense burden. However, disagreements persist over burden-sharing formulas, the role of nuclear deterrence, and the extent to which European strategic autonomy should complement or compete with transatlantic structures.</p>

<p>As the alliance prepares for its next summit, the central question is no longer whether members will invest in defense, but whether the investments being made are strategically coherent, industrially sustainable, and fast enough to meet the challenges of an increasingly dangerous world.</p>`,
  },
  {
    title: "UN Security Council Deadlocked Over Middle East Ceasefire Resolution",
    slug: "un-security-council-deadlocked-middle-east-ceasefire",
    category: "diplomacy",
    excerpt: "Competing draft resolutions fail to gain required votes as permanent members exercise veto powers, leaving diplomatic efforts at an impasse.",
    image: "https://images.unsplash.com/photo-1603027937430-904a8a109ba3?w=1200&h=630&fit=crop",
    source: "United Nations Press",
    content: `<h2>UN Security Council Deadlocked Over Middle East Ceasefire Resolution</h2>

<p>The United Nations Security Council remains paralyzed over efforts to broker a lasting ceasefire in the Middle East, with competing draft resolutions failing to secure the necessary support in a series of votes that have exposed deep fault lines within the international community. Two permanent members exercised their veto powers in a dramatic late-night session, blocking a resolution that had the backing of twelve of the fifteen Council members — the widest gap between popular support and outcome in recent memory.</p>

<p>The deadlock represents the Council's most significant failure since the beginning of the current crisis, and has prompted soul-searching about the institution's relevance and legitimacy. In the halls of the UN headquarters in New York, diplomats from dozens of nations have expressed frustration bordering on despair at the inability of the world's premier security body to take meaningful action in the face of escalating violence.</p>

<h3>The Competing Proposals</h3>

<p>The vetoed resolution, sponsored by a coalition of European and Latin American members, called for an immediate and unconditional ceasefire, the release of all hostages and political prisoners, unimpeded humanitarian access to all affected areas, and the establishment of an international monitoring mechanism. The text was the product of weeks of intense negotiation and represented significant compromises from its original sponsors.</p>

<p>A rival draft, supported by the vetoing powers, proposed a more limited "humanitarian pause" framework with conditions attached, including commitments from all parties to refrain from "provocative military actions" — language that critics said was deliberately vague and would allow continued operations under the guise of self-defense. This alternative also failed to secure the nine votes needed for adoption.</p>

<h3>Diplomatic Fallout and Global Reaction</h3>

<p>The failed vote has drawn sharp and unprecedented criticism from humanitarian organizations, governments worldwide, and the UN's own leadership. The Secretary-General issued a rare public rebuke, calling the deadlock "a moral failure of the highest order" and warning that the Council's inability to act was "eroding the very foundations of the rules-based international order that this institution was created to uphold."</p>

<p>"When the Security Council is unable to act, civilians pay the price," said the president of the International Committee of the Red Cross in Geneva. "We need immediate, unconditional humanitarian access and a complete cessation of hostilities. Every day of delay costs lives — hundreds of lives, many of them children."</p>

<p>The General Assembly has begun exploring an "Uniting for Peace" resolution, a rarely invoked mechanism that allows the broader membership to make recommendations when the Security Council is deadlocked. While General Assembly resolutions are not legally binding, supporters argue they carry significant moral and political weight.</p>

<h3>Alternative Diplomatic Tracks</h3>

<p>With the Security Council blocked, attention has shifted to regional mediators and back-channel negotiations. Several Gulf states have offered to host indirect talks between the belligerents, leveraging their relationships with all parties to the conflict. European capitals are coordinating a parallel diplomatic initiative focused on incremental confidence-building measures, including prisoner exchanges, humanitarian corridor agreements, and localized ceasefires.</p>

<h3>Humanitarian Emergency Deepens</h3>

<p>On the ground, the situation continues to deteriorate at an alarming rate. Relief agencies report severe shortages of food, medicine, and clean water in besieged areas, with hospitals operating far beyond capacity and critical infrastructure — including power plants, water treatment facilities, and telecommunications networks — in ruins. The World Health Organization has documented the destruction or severe damage of over 60% of healthcare facilities in the most affected areas.</p>

<p>Displacement figures have surpassed two million, with refugee camps and host communities in neighboring countries struggling to absorb the influx. The UN's humanitarian appeal for the crisis remains less than 30% funded, a gap that agencies say is costing lives daily.</p>

<p>As diplomatic efforts continue to founder, the growing disconnect between the scale of human suffering and the paralysis of international institutions has become perhaps the defining challenge of contemporary multilateral governance.</p>`,
  },
  {
    title: "China and Philippines Trade Accusations Over South China Sea Standoff",
    slug: "china-philippines-south-china-sea-standoff-accusations",
    category: "geopolitics",
    excerpt: "Maritime tensions escalate as both nations accuse each other of dangerous provocations near disputed reefs, drawing concern from regional allies.",
    image: "https://images.unsplash.com/photo-1580309237429-661ea0f5aa77?w=1200&h=630&fit=crop",
    source: "Asia Pacific Monitor",
    content: `<h2>China and Philippines Trade Accusations Over South China Sea Standoff</h2>

<p>Tensions in the South China Sea have reached their highest point in years after a series of increasingly dangerous confrontations between Chinese coast guard vessels and Philippine supply ships near the disputed Second Thomas Shoal. Both nations have accused each other of provocative and dangerous maneuvers in the contested waterway, raising fears of an accidental escalation that could draw in regional and global powers.</p>

<p>The Second Thomas Shoal, known as Ayungin Shoal in the Philippines and Ren'ai Jiao in China, has become the most volatile flashpoint in the broader South China Sea dispute. The Philippines maintains a small military garrison aboard the BRP Sierra Madre, a deliberately grounded World War II-era ship, which requires regular resupply missions that have become the primary trigger for confrontations with Chinese maritime forces.</p>

<h3>Escalating Confrontations at Sea</h3>

<p>Philippine military officials released detailed footage and photographic evidence showing Chinese coast guard vessels using high-pressure water cannons against Philippine resupply boats, causing structural damage to one vessel and injuring several crew members. In separate incidents, Chinese maritime militia ships — ostensibly civilian fishing vessels that operate under military direction — were documented engaging in dangerous blocking maneuvers at close range.</p>

<p>Beijing countered with its own narrative, releasing selectively edited video claiming that Philippine ships had "illegally intruded" into Chinese territorial waters and "deliberately provoked" the confrontation. The Chinese Foreign Ministry called the Philippines' actions "deliberate provocations encouraged and supported by outside powers that bear full responsibility for the consequences."</p>

<p>"These actions represent a clear and systematic violation of international law, the UN Convention on the Law of the Sea, and the 2016 arbitral ruling," declared the Philippine Foreign Secretary in a strongly worded statement delivered before the national legislature. "The Philippines will not be intimidated into abandoning our sovereign rights or the personnel who serve on our outpost."</p>

<h3>Legal and Historical Context</h3>

<p>The confrontations take place against the backdrop of the landmark 2016 ruling by the Permanent Court of Arbitration in The Hague, which categorically rejected China's expansive nine-dash-line claims over the South China Sea. The tribunal found that China had violated Philippine sovereign rights, caused environmental destruction through island-building activities, and had no legal basis for claiming historic rights over the vast majority of the sea.</p>

<p>China has consistently rejected the ruling as "null and void," and has continued to expand its military presence on artificially constructed islands throughout the Spratly and Paracel chains. These installations now feature advanced radar systems, anti-ship missile batteries, fighter aircraft hangars, and port facilities capable of supporting naval operations.</p>

<h3>Alliance Dynamics and Regional Response</h3>

<p>The United States has unequivocally reaffirmed its mutual defense treaty obligations to the Philippines, with senior officials stating that an armed attack on Philippine military vessels or personnel in the South China Sea would invoke Article IV of the 1951 Mutual Defense Treaty. The U.S. has also increased the frequency of freedom-of-navigation operations and joint exercises with Philippine forces in the contested waters.</p>

<p>Japan and Australia have expressed strong solidarity with the Philippines and called for adherence to the rules-based maritime order. Japan's Maritime Self-Defense Force has begun conducting joint patrols with the Philippine Navy in waters adjacent to the disputed zones, while Australia has provided intelligence-sharing support and maritime surveillance capabilities.</p>

<p>ASEAN, the regional bloc of Southeast Asian nations, has struggled to present a unified position, with some members reluctant to confront China due to deep economic dependencies. The long-delayed ASEAN Code of Conduct negotiations, intended to establish binding rules for behavior in the South China Sea, have made little substantive progress despite over two decades of discussions.</p>

<h3>Economic Stakes</h3>

<p>The South China Sea carries approximately one-third of global maritime trade, valued at over $5 trillion annually. It is also believed to contain significant reserves of oil and natural gas, as well as some of the world's richest fishing grounds — resources that are critical to the food security and economic development of the surrounding nations. Control over these waters has implications that extend far beyond the bilateral disputes, touching on the fundamental question of whether international law or military power will determine the rules of the road in the 21st-century maritime domain.</p>`,
  },
  {
    title: "European Leaders Forge United Front on Energy Security at Brussels Summit",
    slug: "european-leaders-energy-security-brussels-summit",
    category: "international-politics",
    excerpt: "EU heads of state agree on a comprehensive energy resilience package aimed at reducing dependence on volatile global markets and hostile state actors.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=630&fit=crop",
    source: "European Policy Centre",
    content: `<h2>European Leaders Forge United Front on Energy Security at Brussels Summit</h2>

<p>European Union heads of state concluded a two-day emergency summit in Brussels with a landmark agreement on energy security, marking a decisive and historic pivot away from dependence on Russian fossil fuels and volatile global energy markets. The comprehensive package, described by officials as the most ambitious energy initiative since the founding of the European Coal and Steel Community, includes accelerated renewable energy deployment, mandatory strategic gas reserves, new pipeline infrastructure connecting Southern and Northern Europe, and massive investment in next-generation nuclear technology.</p>

<p>The agreement came after marathon negotiations that stretched through the night, with leaders from 27 member states navigating complex trade-offs between climate ambitions, energy affordability, industrial competitiveness, and fiscal constraints. The final text represents a carefully calibrated compromise that every member state could endorse.</p>

<h3>Key Provisions of the Energy Resilience Pact</h3>

<p>The centerpiece of the agreement is a €200 billion joint investment fund — the European Energy Resilience Fund — financed through a combination of joint EU bonds, reallocated cohesion funds, and member state contributions. The fund will support clean energy infrastructure across the continent, with particular emphasis on cross-border interconnectors, offshore wind megaprojects in the North Sea and Mediterranean, and the expansion of hydrogen production and transport networks.</p>

<p>The pact mandates minimum gas storage levels of 90% capacity for all member states before each winter season, a lesson learned from the energy crises of 2022-2023 when inadequate reserves left several countries vulnerable to supply disruptions. A new EU-wide energy solidarity mechanism will require member states to share reserves during emergencies.</p>

<p>Nuclear energy has been formally included as a "transitional and complementary" technology, overcoming long-standing objections from Germany, Austria, and Luxembourg. France, which generates over 70% of its electricity from nuclear power, championed the inclusion and has pledged to lead a new European nuclear industrial alliance aimed at developing small modular reactors for deployment across the continent by the early 2030s.</p>

<p>"Energy security is national security," said the French President during the closing press conference. "Today, Europe speaks with one voice on the most critical strategic challenge of our generation. We have chosen sovereignty over dependence, investment over vulnerability, and unity over fragmentation."</p>

<h3>The Path to Energy Independence</h3>

<p>The summit also produced a detailed roadmap for reducing Russian energy imports to zero by 2028, accelerating a process that began in the chaotic months following the invasion of Ukraine. Russian pipeline gas, which once supplied over 40% of European consumption, now accounts for less than 8% — a dramatic shift achieved through demand reduction, alternative suppliers, and accelerated renewable deployment.</p>

<p>European Commission projections indicate that the continent's renewable energy capacity will triple by 2032 under current trajectories, with solar and wind together expected to surpass natural gas as the EU's largest source of electricity generation within three years. The challenge lies not in generation capacity but in grid infrastructure, energy storage, and the management of intermittent supply.</p>

<h3>Implementation Challenges</h3>

<p>Despite the show of unity, significant challenges remain. Eastern European members are pushing for faster timelines and greater financial support, while fiscally conservative nations have expressed concern about the scale of joint borrowing. Environmental groups have also criticized the inclusion of natural gas and nuclear energy in the transition framework.</p>

<p>Industry representatives have broadly welcomed the agreement, noting that energy price stability is essential for European manufacturers competing against Chinese and American rivals who benefit from lower energy costs. The European Round Table for Industry called the pact "a necessary and overdue recognition that economic competitiveness and energy security are two sides of the same coin."</p>`,
  },
  {
    title: "Sudan Civil War Deepens as Rival Factions Reject Latest Peace Framework",
    slug: "sudan-civil-war-deepens-rival-factions-reject-peace",
    category: "war",
    excerpt: "Both the Sudanese Armed Forces and the RSF refuse to commit to the African Union's proposed ceasefire, prolonging a conflict that has displaced millions.",
    image: "https://images.unsplash.com/photo-1542223616-740d5dff7f56?w=1200&h=630&fit=crop",
    source: "Africa Conflict Watch",
    content: `<h2>Sudan Civil War Deepens as Rival Factions Reject Latest Peace Framework</h2>

<p>The devastating civil war in Sudan shows no signs of abating after both the Sudanese Armed Forces (SAF) and the Rapid Support Forces (RSF) rejected the latest peace framework proposed jointly by the African Union, the Intergovernmental Authority on Development (IGAD), and a coalition of international mediators. The conflict, which erupted in April 2023 as a power struggle between two military leaders, has metastasized into one of the world's worst humanitarian catastrophes.</p>

<p>What began as a rivalry between General Abdel Fattah al-Burhan, chairman of the SAF, and his former deputy Mohamed Hamdan Dagalo (known as Hemedti), commander of the RSF, has fractured Sudan along ethnic, tribal, and regional lines. Fighting has spread from the capital Khartoum to Darfur, Kordofan, and the Gezira agricultural heartland, devastating communities and infrastructure across an area larger than Western Europe.</p>

<h3>Collapse of the Latest Negotiations</h3>

<p>The proposed peace framework, the seventh major diplomatic initiative since the war began, called for an immediate and verifiable ceasefire, the creation of monitored humanitarian corridors, the establishment of a civilian-led transitional government, and a phased process of security sector reform. The plan was the product of six months of shuttle diplomacy involving African mediators, United Nations officials, and representatives from the United States, Saudi Arabia, and the European Union.</p>

<p>However, both factions raised fundamental objections that revealed the depth of their mutual distrust. The SAF demanded the RSF's formal dissolution and prosecution of its leaders as preconditions — terms amounting to unconditional surrender. The RSF insisted on power-sharing arrangements giving it control over several states, which the military categorically refused.</p>

<p>"We are witnessing the systematic destruction of a nation," warned the UN Special Envoy for Sudan in an emotional briefing to the Security Council. "Without an immediate cessation of hostilities, Sudan faces famine on a scale not seen in decades."</p>

<h3>The Humanitarian Catastrophe</h3>

<p>Over 12 million people have been internally displaced since the conflict began, making Sudan home to the world's largest displacement crisis. An additional 2.5 million have fled across borders into Chad, Egypt, South Sudan, Ethiopia, and the Central African Republic.</p>

<p>The UN World Food Programme estimates that 25 million Sudanese — more than half the population — are facing acute food insecurity, with famine conditions declared in several areas of Darfur and Kordofan. Agricultural production has collapsed in the once-fertile Gezira region, where fighting has destroyed irrigation infrastructure and forced farmers to abandon their land.</p>

<p>Reports of widespread atrocities continue to emerge. In Darfur, ethnic violence perpetrated primarily by RSF-aligned Arab militias against non-Arab communities has drawn comparisons to the genocide of the 2000s and prompted calls for international criminal investigations. Mass graves have been documented by satellite, and survivors report systematic sexual violence, forced displacement, and the destruction of entire villages.</p>

<h3>External Actors and Proxy Dynamics</h3>

<p>The conflict is further complicated by external actors pursuing their own strategic interests. The UAE has been accused of supplying weapons to the RSF, while Egypt has provided backing to the SAF. International efforts to impose an arms embargo have been blocked at the Security Council, resulting in a conflict simultaneously fueled by external intervention and overlooked by a world preoccupied with crises in Europe and the Middle East.</p>`,
  },
  {
    title: "India and Pakistan Hold Surprise Diplomatic Talks on Kashmir Tensions",
    slug: "india-pakistan-surprise-diplomatic-talks-kashmir",
    category: "diplomacy",
    excerpt: "In an unexpected move, foreign ministers of both nuclear powers meet on neutral ground to discuss de-escalation along the Line of Control.",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=1200&h=630&fit=crop",
    source: "South Asia Dispatch",
    content: `<h2>India and Pakistan Hold Surprise Diplomatic Talks on Kashmir Tensions</h2>

<p>In a development that caught the international community by surprise, the foreign ministers of India and Pakistan met on neutral ground in Abu Dhabi for their first substantive diplomatic engagement in over three years. The talks, discreetly facilitated by the United Arab Emirates, focused on de-escalation along the volatile Line of Control (LoC) in Kashmir and restoring communication channels that have been dormant since India's revocation of Article 370 and the downgrading of diplomatic relations in 2019.</p>

<p>The meeting, held at a private estate away from media scrutiny, lasted over six hours — far longer than the originally planned two-hour session — suggesting genuine willingness to explore compromises rather than simply restate positions.</p>

<h3>A Cautious but Significant Opening</h3>

<p>Both sides issued carefully worded joint statements describing the discussions as "constructive, candid, and forward-looking," though officials were careful to temper public expectations. The statement acknowledged "the importance of maintaining peace and stability in the region" and committed to "continuing the dialogue process at the appropriate level."</p>

<p>The meeting covered confidence-building measures including the restoration of high commissioner-level diplomacy, resumption of cross-border trade at Wagah, protocols for preventing military escalation along the LoC, and renewal of a bilateral nuclear risk reduction agreement that had quietly lapsed.</p>

<p>"Dialogue is the only path forward between two nuclear-armed neighbors who share a geography, a history, and a responsibility to their combined 1.7 billion people," said the Pakistani Foreign Minister. His Indian counterpart emphasized that "peace requires a conducive atmosphere and demonstrable, verifiable action against cross-border terrorism."</p>

<h3>Drivers of Rapprochement</h3>

<p>Analysts point to several converging factors. For India, normalization would eliminate a persistent security distraction and allow New Delhi to focus on its strategic competition with China. A stable western border would also facilitate India's economic corridor projects connecting to Central Asia and the Middle East.</p>

<p>For Pakistan, economic pressures are an overwhelming imperative. The country has faced prolonged fiscal crisis requiring multiple IMF bailouts, and improved relations with India could unlock significant trade potential and reduce crippling defense expenditures. Islamabad is also keen to demonstrate diplomatic maturity as it seeks expanded engagement with Gulf states, the EU, and the United States.</p>

<p>The UAE's facilitator role reflects Abu Dhabi's growing influence as a diplomatic broker in South Asian affairs, building on its experience with the Abraham Accords.</p>

<h3>Regional and Global Significance</h3>

<p>The talks have been welcomed by major powers, with the United States, China, and Russia all issuing supportive statements. Washington views India-Pakistan de-escalation as beneficial to regional stability. China, which maintains close ties with Pakistan while managing an increasingly complex relationship with India, has encouraged dialogue while avoiding any suggestion of a mediating role.</p>

<p>The Kashmir dispute itself — the fundamental source of rivalry since partition in 1947 — remains far from resolution, and no one expects these initial talks to produce a settlement on the territory's final status. However, the very fact that both governments have chosen engagement over confrontation represents a meaningful, if fragile, shift in one of the world's most dangerous bilateral relationships.</p>`,
  },
  {
    title: "Pentagon Unveils Next-Generation Stealth Drone for Pacific Theater Operations",
    slug: "pentagon-unveils-stealth-drone-pacific-theater",
    category: "military",
    excerpt: "The U.S. Department of Defense reveals its most advanced autonomous combat drone, designed to operate alongside manned fighters in contested airspace.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=630&fit=crop",
    source: "Defense Technology Review",
    content: `<h2>Pentagon Unveils Next-Generation Stealth Drone for Pacific Theater Operations</h2>

<p>The U.S. Department of Defense has officially unveiled its most advanced autonomous combat drone system, the CCA-X (Collaborative Combat Aircraft - Experimental), at a closely guarded facility in the Nevada desert. Designed to operate as autonomous wingmen alongside sixth-generation manned fighters, the drone represents a fundamental paradigm shift in how the United States military plans to project air power across the vast and contested distances of the Indo-Pacific theater.</p>

<p>The unveiling, attended by senior military officials, Congressional defense leaders, and allied military attachés from Japan, Australia, and the United Kingdom, marked the first public acknowledgment of a program developed under extraordinary secrecy. The aircraft had been flight-tested over 200 times at classified ranges before its existence was confirmed.</p>

<h3>Revolutionary Capabilities</h3>

<p>The CCA-X features a flying-wing design with advanced radar-absorbing materials and shaping that gives it a radar cross-section smaller than a marble — making it effectively invisible to current generation air defense systems. Its autonomous decision-making capabilities, powered by a custom AI architecture trained on millions of simulated combat scenarios, allow it to execute complex missions including air-to-air combat, suppression of enemy air defenses, electronic warfare, and precision strike — all without continuous human control.</p>

<p>A human operator supervises broad parameters and retains authority over lethal engagement decisions, consistent with Department of Defense policy on autonomous weapons. However, the drone can autonomously navigate, identify threats, take evasive action, and recommend engagement options at machine speed — capabilities considered essential when combat may exceed human reaction times.</p>

<p>The aircraft can carry a diverse internal payload including AIM-260 Joint Advanced Tactical Missiles, small-diameter precision bombs, electronic warfare jamming suites, and multi-spectral intelligence sensors. Internal weapons bays preserve stealth characteristics throughout the mission profile.</p>

<p>"This changes the fundamental calculus of air combat," said the Secretary of the Air Force. "By deploying autonomous wingmen alongside our manned fleet, we can achieve unprecedented mass, range, and lethality in contested environments. A single human pilot directing a formation of CCA-X drones can cover four times the battlespace of a traditional flight."</p>

<h3>Economic and Industrial Revolution</h3>

<p>Perhaps most significantly, each CCA-X unit is targeted at $20-25 million — cheap enough to be considered "attritable," meaning commanders can accept losses that would be unacceptable for manned aircraft costing $80-300 million each. The Air Force plans to acquire over 1,000 units, with the Navy and Marine Corps developing carrier-compatible variants.</p>

<h3>Strategic Context: The Pacific Challenge</h3>

<p>The program is widely understood as a direct response to China's rapid military modernization, particularly the PLA Air Force's J-20 stealth fighters, expanding carrier fleet, and sophisticated anti-access/area-denial capabilities including the DF-26 "carrier killer" missile. Autonomous combat aircraft extend America's reach, multiply its force, and impose costs that fundamentally change the deterrence equation.</p>

<p>Allied military leaders praised the program's potential for coalition interoperability. Japan's Vice Minister of Defense called it "a transformative capability that reinforces the credibility of the alliance and strengthens deterrence at a critical moment in the Indo-Pacific security environment."</p>`,
  },
  {
    title: "Arctic Sovereignty Dispute Heats Up as Russia Expands Northern Military Bases",
    slug: "arctic-sovereignty-dispute-russia-expands-military-bases",
    category: "geopolitics",
    excerpt: "Moscow accelerates construction of military installations along the Northern Sea Route as melting ice opens new strategic and economic pathways.",
    image: "https://images.unsplash.com/photo-1504803900752-c2051699d0e8?w=1200&h=630&fit=crop",
    source: "Polar Strategy Institute",
    content: `<h2>Arctic Sovereignty Dispute Heats Up as Russia Expands Northern Military Bases</h2>

<p>Russia has dramatically accelerated the expansion of its military presence in the Arctic, with satellite imagery revealing extensive new construction at bases stretching along the entire Northern Sea Route from Murmansk to the Bering Strait. The buildup includes upgraded airfields capable of handling strategic bombers, next-generation radar installations, coastal defense missile batteries armed with Bastion and Bal anti-ship systems, and deep-water port facilities capable of accommodating nuclear-powered submarines.</p>

<p>The scale and pace of construction have alarmed NATO allies, sparking diplomatic protests from neighboring Arctic states and renewed debate about Western military capabilities in the High North. Moscow has framed the expansion as defensive, but military analysts say the capabilities deployed far exceed what territorial defense alone would require.</p>

<h3>The Strategic Prize: A New Ocean Opens</h3>

<p>Climate change is rapidly reshaping the Arctic. Sea ice extent has declined by over 40% since satellite measurements began in 1979, and scientists project that the Arctic Ocean could experience its first ice-free summer within the decade. This has opened new shipping lanes that could cut transit times between Europe and Asia by up to 40%, while exposing vast reserves of oil, natural gas, rare earth minerals, and fisheries previously locked beneath permanent ice.</p>

<p>The U.S. Geological Survey estimates the Arctic contains approximately 13% of the world's undiscovered oil and 30% of undiscovered natural gas — resources valued in the trillions. The Northern Sea Route alone, if commercialized at scale, could generate hundreds of billions in shipping revenues.</p>

<p>"Russia views the Northern Sea Route as its sovereign territory and is prepared to enforce that claim militarily," said Dr. Olga Petersen of the Nordic Arctic Security Centre. "What we're witnessing is the most significant Arctic militarization since the Cold War, and potentially more consequential because the region's strategic value has increased exponentially."</p>

<h3>Russia's Arctic Strategy</h3>

<p>Moscow has reopened and modernized dozens of Soviet-era military installations abandoned after the Cold War. The crown jewel is Nagurskoye air base on Franz Josef Land, the world's northernmost military installation, expanded to include hardened aircraft shelters, barracks, and a 2,500-meter runway for strategic aviation.</p>

<p>Russia's Northern Fleet, headquartered in Severomorsk, has been redesignated as a full military district — giving its commander direct authority over all regional forces. The fleet operates Russia's most advanced naval assets, including nuclear-powered battle cruisers, Yasen-class attack submarines, and Borei-class ballistic missile submarines forming a critical leg of Russia's nuclear deterrent.</p>

<h3>Allied Response and Strategic Competition</h3>

<p>NATO has responded by increasing Arctic presence and establishing new polar command structures. Norway has deployed F-35 fighters to its northernmost air base, the United States has reactivated the 2nd Fleet for North Atlantic and Arctic operations, and the Army has established a dedicated Arctic warfare training center in Alaska.</p>

<p>Canada has announced multi-billion-dollar NORAD modernization including new over-the-horizon radars for the Arctic corridor. Denmark has strengthened Greenland's defense infrastructure with additional patrol vessels and a Joint Arctic Command.</p>

<p>The Arctic Council, the primary intergovernmental forum for the region, has been paralyzed since Russia's invasion of Ukraine prompted the other seven members to suspend cooperation. This governance gap at a moment of surging strategic importance raises the prospect that competition rather than cooperation will define the Arctic's future.</p>`,
  },
  {
    title: "G20 Summit Fails to Produce Joint Statement as Geopolitical Rifts Widen",
    slug: "g20-summit-fails-joint-statement-geopolitical-rifts",
    category: "international-politics",
    excerpt: "Deep divisions over ongoing conflicts and trade disputes prevent the world's largest economies from reaching consensus at the annual leaders' summit.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=630&fit=crop",
    source: "Global Governance Monitor",
    content: `<h2>G20 Summit Fails to Produce Joint Statement as Geopolitical Rifts Widen</h2>

<p>The annual G20 leaders' summit concluded without a joint communiqué for the second consecutive year, as deep divisions over ongoing wars, trade practices, technology competition, and climate finance proved insurmountable despite two days of intensive negotiations. The failure among the world's twenty largest economies underscores the growing fragmentation of the international order and raises serious questions about the future of multilateral institutions.</p>

<p>The summit brought together leaders representing roughly 85% of global GDP, 75% of international trade, and two-thirds of the world's population. That such economic and political power proved unable to produce even a modest statement speaks volumes about the depth of current geopolitical divisions.</p>

<h3>The Key Fault Lines</h3>

<p>Western nations pushed for strong language condemning Russia's invasion of Ukraine, which was firmly blocked by Russia and effectively supported by China. Several Global South members — including India, Brazil, South Africa, and Indonesia — adopted a mediating position, arguing the G20 should focus on economics rather than security disputes better addressed at the UN Security Council.</p>

<p>"The G20 is not a geopolitical forum," argued the Indian delegation. "Its mandate is economic coordination, and we should not allow bilateral disputes to paralyze our ability to address challenges facing billions of people."</p>

<p>U.S.-China trade tensions spilled into virtually every agenda item, with acrimonious exchanges over market access, technology transfer, industrial subsidies, and the weaponization of economic interdependence. China accused the U.S. of "economic coercion" through semiconductor export controls, while Washington cited national security and unfair trade practices.</p>

<h3>Climate Finance Impasse</h3>

<p>Developing nations expressed deep frustration over persistent failure to meet climate finance commitments first articulated at Paris in 2015. The $100 billion annual target, promised for 2020, has never been fully met, and negotiations on a successor framework have stalled over disagreements about size, structure, and contributors.</p>

<p>African representatives noted that Africa contributes less than 4% of global emissions but suffers disproportionately from climate impacts. Small island states warned that without concrete, binding finance mechanisms, the 1.5°C target is effectively dead, and adaptation costs will fall on nations least responsible and least equipped.</p>

<h3>The Crisis of Multilateralism</h3>

<p>"The G20 was created to manage economic crises through coordinated action, but it has become a mirror of geopolitical fragmentation," said the host nation's Prime Minister. "We must find a way to separate areas of cooperation from areas of competition, or risk making this forum irrelevant."</p>

<p>The failure has prompted debate about "minilateral" arrangements — smaller groupings able to act more decisively. Others warn that abandoning inclusive multilateralism would further entrench divisions and leave vulnerable nations voiceless.</p>

<p>As leaders departed without the traditional group photograph — a symbolic absence that did not go unnoticed — the question hanging over the G20 was existential: can an institution designed to bridge differences survive in an era defined by them?</p>`,
  },
];

async function main() {
  console.log("Deleting existing posts and tags...");
  await prisma.tagOnPost.deleteMany();
  await prisma.post.deleteMany();
  console.log("Existing posts deleted.");

  // Ensure categories exist
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, color: cat.color },
      create: { name: cat.name, slug: cat.slug, color: cat.color },
    });
  }
  console.log("Categories ensured.");

  // Create posts with staggered dates
  const now = Date.now();
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const category = await prisma.category.findUnique({ where: { slug: p.category } });
    const publishedAt = new Date(now - i * 3 * 60 * 60 * 1000); // 3 hours apart

    await prisma.post.create({
      data: {
        title: p.title,
        slug: p.slug,
        content: p.content,
        excerpt: p.excerpt,
        featuredImage: p.image,
        published: true,
        autoGenerated: true,
        metaTitle: p.title,
        metaDesc: p.excerpt,
        metaKeywords: `${category?.name || ""}, war, politics, international`,
        readTime: Math.max(3, Math.ceil(p.content.length / 1200)),
        sourceUrl: `https://example.com/news/${p.slug}`,
        sourceName: p.source,
        categoryId: category?.id,
        publishedAt,
        views: Math.floor(Math.random() * 500) + 50,
      },
    });
    console.log(`Created: ${p.title}`);
  }

  console.log(`\nDone! ${posts.length} posts created.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
