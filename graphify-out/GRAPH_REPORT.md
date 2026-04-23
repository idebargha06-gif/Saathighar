# Graph Report - C:\Projects\Saathighar  (2026-04-23)

## Corpus Check
- 18 files · ~259,482 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 86 nodes · 126 edges · 20 communities detected
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]

## God Nodes (most connected - your core abstractions)
1. `getSB()` - 16 edges
2. `showToast()` - 9 edges
3. `getSB()` - 8 edges
4. `initFamilyReg()` - 7 edges
5. `initPasswordToggle()` - 5 edges
6. `initAshramReg()` - 5 edges
7. `initVolunteerReg()` - 5 edges
8. `getSB()` - 5 edges
9. `initPasswordStrength()` - 4 edges
10. `initOTPInput()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `showToast()` --calls--> `startAshramSubscription()`  [INFERRED]
  C:\Projects\Saathighar\assets\js\auth.js → C:\Projects\Saathighar\assets\js\services.js
- `initPortalHeader()` --calls--> `getSB()`  [INFERRED]
  C:\Projects\Saathighar\assets\js\portal.js → C:\Projects\Saathighar\assets\js\services.js
- `showToast()` --calls--> `initiateResidentFeePayment()`  [INFERRED]
  C:\Projects\Saathighar\assets\js\auth.js → C:\Projects\Saathighar\assets\js\services.js
- `showToast()` --calls--> `initiateDonation()`  [INFERRED]
  C:\Projects\Saathighar\assets\js\auth.js → C:\Projects\Saathighar\assets\js\services.js

## Hyperedges (group relationships)
- **Multi-Portal Architecture** — ashram_portal, user_reviews, audience_personas [EXTRACTED 0.95]
- **Accessibility & User Experience** — emergency_helpline, accessibility_layer, design_system_css [EXTRACTED 0.90]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.19
Nodes (16): getCurrentProfile(), getLatestWellness(), getMemoryWall(), getMyAshram(), getMyResidents(), getSB(), getUnreadNotifications(), initiateDonation() (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.22
Nodes (12): doGoogleLogin(), doLogin(), doSignOut(), doSignUp(), getSB(), redirectIfLoggedIn(), routeUser(), sendPhoneOTP() (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (11): initAshramReg(), initAshramSearch(), initCareOptions(), initFamilyReg(), initFileUpload(), initLoginPage(), initMultiStep(), initOTPInput() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.36
Nodes (7): getSB(), loadNotifications(), markAllRead(), markRead(), renderList(), subscribeRealtime(), updateBadge()

### Community 4 - "Community 4"
Cohesion: 0.29
Nodes (1): initPortalHeader()

### Community 5 - "Community 5"
Cohesion: 0.67
Nodes (1): showSlide()

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (2): redirectIfLoggedIn(), routeUser()

### Community 7 - "Community 7"
Cohesion: 0.67
Nodes (2): Update paths in HTML file based on folder depth, update_html_file()

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (1): SaathiGhar â€” Elderly Care Accountability Platform

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (1): Three Personas â€” Families, Ashrams, Volunteers

## Knowledge Gaps
- **3 isolated node(s):** `Update paths in HTML file based on folder depth`, `SaathiGhar â€” Elderly Care Accountability Platform`, `Three Personas â€” Families, Ashrams, Volunteers`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 8`** (1 nodes): `finalize.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `gen_html.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `label_communities.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `merge_extract.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `build_ashrams.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `build_dashboard.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `build_dashboard2.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `build_profile.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (1 nodes): `build_site.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `patch_links.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `SaathiGhar â€” Elderly Care Accountability Platform`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `Three Personas â€” Families, Ashrams, Volunteers`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `showToast()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `getSB()` connect `Community 0` to `Community 4`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Why does `initPortalHeader()` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `showToast()` (e.g. with `initiateResidentFeePayment()` and `initiateDonation()`) actually correct?**
  _`showToast()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Update paths in HTML file based on folder depth`, `SaathiGhar â€” Elderly Care Accountability Platform`, `Three Personas â€” Families, Ashrams, Volunteers` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._