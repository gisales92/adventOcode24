/* 
--- Day 5: Print Queue ---
Satisfied with their search on Ceres, the squadron of scholars suggests subsequently scanning the stationery stacks of sub-basement 17.

The North Pole printing department is busier than ever this close to Christmas, and while The Historians continue their search of this historically significant facility, an Elf operating a very familiar printer beckons you over.

The Elf must recognize you, because they waste no time explaining that the new sleigh launch safety manual updates won't print correctly. Failure to update the safety manuals would be dire indeed, so you offer your services.

Safety protocols clearly indicate that new pages for the safety manuals must be printed in a very specific order. The notation X|Y means that if both page number X and page number Y are to be produced as part of an update, page number X must be printed at some point before page number Y.

The Elf has for you both the page ordering rules and the pages to produce in each update (your puzzle input), but can't figure out whether each update has the pages in the right order.

For example:

47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
The first section specifies the page ordering rules, one per line. The first rule, 47|53, means that if an update includes both page number 47 and page number 53, then page number 47 must be printed at some point before page number 53. (47 doesn't necessarily need to be immediately before 53; other pages are allowed to be between them.)

The second section specifies the page numbers of each update. Because most safety manuals are different, the pages needed in the updates are different too. The first update, 75,47,61,53,29, means that the update consists of page numbers 75, 47, 61, 53, and 29.

To get the printers going as soon as possible, start by identifying which updates are already in the right order.

In the above example, the first update (75,47,61,53,29) is in the right order:

75 is correctly first because there are rules that put each other page after it: 75|47, 75|61, 75|53, and 75|29.
47 is correctly second because 75 must be before it (75|47) and every other page must be after it according to 47|61, 47|53, and 47|29.
61 is correctly in the middle because 75 and 47 are before it (75|61 and 47|61) and 53 and 29 are after it (61|53 and 61|29).
53 is correctly fourth because it is before page number 29 (53|29).
29 is the only page left and so is correctly last.
Because the first update does not include some page numbers, the ordering rules involving those missing page numbers are ignored.

The second and third updates are also in the correct order according to the rules. Like the first update, they also do not include every page number, and so only some of the ordering rules apply - within each update, the ordering rules that involve missing page numbers are not used.

The fourth update, 75,97,47,61,53, is not in the correct order: it would print 75 before 97, which violates the rule 97|75.

The fifth update, 61,13,29, is also not in the correct order, since it breaks the rule 29|13.

The last update, 97,13,75,29,47, is not in the correct order due to breaking several rules.

For some reason, the Elves also need to know the middle page number of each update being printed. Because you are currently only printing the correctly-ordered updates, you will need to find the middle page number of each correctly-ordered update. In the above example, the correctly-ordered updates are:

75,47,61,53,29
97,61,53,29,13
75,29,13
These have middle page numbers of 61, 53, and 29 respectively. Adding these page numbers together gives 143.

Of course, you'll need to be careful: the actual list of page ordering rules is bigger and more complicated than the above example.

Determine which updates are already in the correct order. What do you get if you add up the middle page number from those correctly-ordered updates?
*/

const inputRules = `57|24
64|37
64|45
19|47
19|45
19|95
98|57
98|37
98|34
98|87
96|87
96|74
96|37
96|97
96|58
11|44
11|98
11|94
11|87
11|91
11|55
62|57
62|67
62|76
62|45
62|92
62|38
62|19
54|38
54|11
54|94
54|97
54|34
54|84
54|47
54|45
27|48
27|65
27|13
27|95
27|47
27|89
27|94
27|55
27|24
13|42
13|57
13|98
13|92
13|81
13|64
13|34
13|74
13|62
13|96
99|84
99|26
99|45
99|38
99|27
99|92
99|35
99|64
99|97
99|48
99|37
37|11
37|68
37|84
37|12
37|27
37|63
37|45
37|48
37|65
37|38
37|47
37|69
58|68
58|95
58|48
58|35
58|92
58|37
58|67
58|57
58|19
58|84
58|34
58|45
58|64
89|42
89|19
89|54
89|65
89|75
89|52
89|73
89|53
89|12
89|62
89|22
89|91
89|55
89|98
73|54
73|87
73|99
73|84
73|37
73|74
73|19
73|97
73|81
73|91
73|57
73|93
73|63
73|95
73|62
12|53
12|22
12|98
12|44
12|87
12|14
12|73
12|54
12|19
12|52
12|92
12|81
12|91
12|69
12|97
12|65
84|89
84|68
84|47
84|24
84|22
84|78
84|52
84|55
84|11
84|76
84|45
84|38
84|65
84|69
84|44
84|14
84|94
95|47
95|75
95|76
95|44
95|69
95|13
95|11
95|78
95|35
95|38
95|89
95|55
95|14
95|48
95|68
95|84
95|65
95|94
22|81
22|99
22|73
22|19
22|96
22|78
22|57
22|42
22|91
22|34
22|87
22|53
22|63
22|67
22|64
22|54
22|74
22|98
22|44
93|11
93|22
93|45
93|65
93|89
93|52
93|68
93|12
93|44
93|78
93|35
93|98
93|96
93|38
93|24
93|76
93|94
93|69
93|14
93|13
44|37
44|73
44|42
44|64
44|19
44|54
44|63
44|91
44|81
44|87
44|96
44|58
44|57
44|62
44|74
44|67
44|53
44|34
44|98
44|92
44|97
81|34
81|99
81|87
81|68
81|95
81|92
81|42
81|58
81|62
81|64
81|57
81|27
81|97
81|37
81|91
81|84
81|26
81|53
81|74
81|93
81|67
81|63
87|63
87|19
87|53
87|58
87|34
87|42
87|74
87|95
87|57
87|27
87|62
87|26
87|68
87|92
87|91
87|67
87|84
87|48
87|97
87|54
87|99
87|93
87|37
26|69
26|55
26|45
26|65
26|22
26|76
26|24
26|38
26|35
26|52
26|84
26|47
26|14
26|13
26|12
26|95
26|94
26|89
26|93
26|44
26|48
26|11
26|68
26|75
63|95
63|89
63|27
63|45
63|48
63|93
63|14
63|35
63|34
63|55
63|75
63|38
63|47
63|65
63|11
63|69
63|24
63|12
63|76
63|68
63|84
63|67
63|94
63|26
45|14
45|96
45|87
45|13
45|73
45|89
45|69
45|47
45|75
45|81
45|78
45|38
45|55
45|52
45|42
45|94
45|44
45|91
45|65
45|24
45|11
45|12
45|98
45|22
35|76
35|78
35|52
35|87
35|94
35|65
35|45
35|47
35|69
35|12
35|81
35|89
35|75
35|14
35|24
35|13
35|98
35|73
35|44
35|11
35|22
35|96
35|38
35|55
69|13
69|64
69|91
69|19
69|92
69|14
69|54
69|57
69|78
69|53
69|96
69|52
69|87
69|42
69|22
69|73
69|99
69|98
69|58
69|62
69|81
69|97
69|44
69|65
48|13
48|76
48|75
48|65
48|52
48|96
48|89
48|44
48|94
48|69
48|55
48|73
48|78
48|22
48|11
48|47
48|45
48|35
48|81
48|12
48|24
48|14
48|38
48|98
38|65
38|75
38|96
38|44
38|58
38|13
38|22
38|52
38|89
38|87
38|94
38|78
38|12
38|24
38|91
38|55
38|81
38|42
38|53
38|98
38|73
38|11
38|14
38|69
67|65
67|68
67|35
67|14
67|24
67|26
67|12
67|84
67|89
67|11
67|38
67|27
67|13
67|55
67|76
67|47
67|94
67|93
67|95
67|69
67|75
67|45
67|48
67|52
53|27
53|19
53|92
53|48
53|68
53|47
53|95
53|67
53|97
53|64
53|84
53|76
53|62
53|34
53|37
53|35
53|74
53|45
53|99
53|54
53|57
53|63
53|26
53|93
68|47
68|69
68|65
68|94
68|45
68|73
68|98
68|89
68|35
68|52
68|11
68|14
68|44
68|55
68|75
68|78
68|76
68|12
68|24
68|38
68|96
68|48
68|13
68|22
97|24
97|45
97|92
97|74
97|38
97|34
97|64
97|76
97|68
97|47
97|57
97|94
97|67
97|93
97|48
97|89
97|37
97|27
97|11
97|26
97|95
97|84
97|35
97|63
74|11
74|63
74|12
74|84
74|75
74|55
74|95
74|69
74|76
74|93
74|68
74|24
74|27
74|38
74|45
74|26
74|67
74|37
74|89
74|34
74|48
74|47
74|94
74|35
91|62
91|37
91|34
91|64
91|26
91|74
91|54
91|63
91|92
91|42
91|68
91|84
91|99
91|57
91|95
91|27
91|19
91|58
91|67
91|48
91|93
91|53
91|35
91|97
76|52
76|12
76|55
76|98
76|78
76|87
76|81
76|22
76|38
76|75
76|65
76|73
76|91
76|47
76|89
76|13
76|69
76|11
76|94
76|44
76|96
76|45
76|24
76|14
55|96
55|98
55|81
55|99
55|75
55|13
55|19
55|54
55|44
55|12
55|52
55|87
55|53
55|58
55|97
55|69
55|22
55|91
55|62
55|73
55|65
55|78
55|42
55|14
75|42
75|14
75|69
75|78
75|54
75|64
75|53
75|81
75|92
75|62
75|13
75|73
75|22
75|91
75|65
75|98
75|52
75|44
75|58
75|19
75|87
75|97
75|96
75|99
24|42
24|14
24|81
24|58
24|55
24|62
24|96
24|44
24|91
24|75
24|99
24|53
24|89
24|54
24|98
24|65
24|52
24|12
24|73
24|69
24|13
24|22
24|78
24|87
34|45
34|76
34|65
34|47
34|48
34|93
34|11
34|68
34|89
34|84
34|94
34|27
34|38
34|67
34|75
34|95
34|12
34|35
34|24
34|69
34|26
34|52
34|55
34|14
92|76
92|74
92|38
92|45
92|55
92|89
92|34
92|64
92|84
92|93
92|94
92|57
92|37
92|48
92|95
92|26
92|11
92|27
92|24
92|63
92|68
92|67
92|35
92|47
42|19
42|34
42|84
42|63
42|76
42|64
42|57
42|74
42|26
42|62
42|27
42|54
42|53
42|95
42|92
42|48
42|67
42|93
42|97
42|35
42|99
42|68
42|58
42|37
78|54
78|63
78|67
78|58
78|97
78|98
78|96
78|53
78|81
78|27
78|92
78|99
78|62
78|57
78|42
78|73
78|37
78|34
78|19
78|74
78|64
78|87
78|26
78|91
65|73
65|58
65|97
65|87
65|91
65|54
65|62
65|13
65|64
65|78
65|57
65|99
65|98
65|19
65|74
65|42
65|52
65|96
65|14
65|44
65|22
65|81
65|92
65|53
52|91
52|19
52|92
52|53
52|63
52|64
52|74
52|99
52|22
52|13
52|54
52|57
52|97
52|73
52|87
52|98
52|42
52|58
52|62
52|81
52|96
52|44
52|78
52|37
47|96
47|89
47|22
47|69
47|94
47|73
47|13
47|91
47|98
47|24
47|38
47|42
47|87
47|58
47|81
47|75
47|12
47|11
47|14
47|55
47|65
47|52
47|78
47|44
94|52
94|44
94|12
94|99
94|87
94|98
94|65
94|14
94|89
94|96
94|55
94|81
94|78
94|53
94|42
94|75
94|22
94|24
94|13
94|58
94|73
94|69
94|62
94|91
14|98
14|22
14|99
14|19
14|96
14|91
14|97
14|58
14|37
14|62
14|81
14|44
14|57
14|78
14|52
14|87
14|42
14|64
14|53
14|13
14|73
14|92
14|54
14|74
57|94
57|47
57|34
57|93
57|74
57|89
57|84
57|11
57|12
57|37
57|76
57|27
57|68
57|95
57|35
57|67
57|55
57|38
57|75
57|63
57|45
57|48
57|26
64|27
64|26
64|34
64|74
64|35
64|63
64|38
64|47
64|93
64|57
64|12
64|11
64|94
64|84
64|48
64|89
64|24
64|55
64|95
64|76
64|68
64|67
19|93
19|35
19|97
19|26
19|76
19|74
19|68
19|84
19|27
19|11
19|67
19|24
19|37
19|48
19|63
19|38
19|64
19|94
19|92
19|57
19|34
98|91
98|19
98|64
98|27
98|73
98|58
98|67
98|42
98|62
98|53
98|26
98|97
98|92
98|95
98|63
98|99
98|81
98|84
98|54
98|74
96|62
96|34
96|26
96|19
96|57
96|98
96|54
96|64
96|42
96|99
96|92
96|63
96|95
96|73
96|53
96|91
96|67
96|81
96|27
11|14
11|22
11|65
11|12
11|53
11|58
11|96
11|73
11|52
11|69
11|81
11|42
11|24
11|99
11|13
11|75
11|89
11|78
62|95
62|84
62|48
62|97
62|68
62|54
62|93
62|63
62|37
62|74
62|34
62|64
62|11
62|27
62|26
62|35
62|47
54|68
54|63
54|95
54|76
54|35
54|48
54|57
54|19
54|67
54|64
54|27
54|93
54|74
54|92
54|37
54|26
27|11
27|14
27|12
27|35
27|52
27|68
27|76
27|26
27|22
27|84
27|69
27|45
27|38
27|75
27|93
13|54
13|78
13|99
13|97
13|73
13|22
13|19
13|87
13|44
13|53
13|91
13|58
13|63
13|37
99|93
99|63
99|19
99|57
99|74
99|62
99|34
99|54
99|67
99|95
99|68
99|47
99|76
37|75
37|95
37|24
37|89
37|35
37|55
37|26
37|76
37|94
37|34
37|67
37|93
58|97
58|74
58|26
58|53
58|76
58|62
58|54
58|27
58|93
58|63
58|99
89|87
89|58
89|78
89|13
89|69
89|14
89|99
89|44
89|96
89|81
73|42
73|92
73|26
73|34
73|27
73|53
73|58
73|67
73|64
12|75
12|78
12|58
12|96
12|13
12|99
12|62
12|42
84|13
84|48
84|35
84|75
84|96
84|12
84|93
95|22
95|12
95|24
95|52
95|45
95|93
22|37
22|58
22|92
22|62
22|97
93|55
93|75
93|47
93|48
44|78
44|27
44|99
81|54
81|19
87|64`

const inputUpdates = `13,19,52,14,65,96,62,98,58,73,97,92,91,87,44,54,42
26,11,93,84,95,45,63,89,27,65,55
97,57,95,26,73,34,81,91,54,64,74
74,91,42,62,87,27,53,98,81,92,97,99,54,63,57,67,96,26,34
87,55,94,65,91,98,44,14,69,78,75,47,45,89,81
26,95,84,93,68,48,35,76,47,38,11,94,24,89,55,12,75,69,65,14,52,13,22
67,91,62,92,64,37,19,26,58,81,54,96,98
95,38,94,89,69,13,44
76,47,38,11,94,24,89,55,12,75,69,65,14,13,22,78,96,98,73,81,87
19,97,92,64,57,74,37,63,67,27,26,95,84,93,68,48,45,38,11
74,62,37,67,92,38,34,57,93
65,42,58,73,97,92,53,54,87,57,22,98,78,81,52,96,14
87,91,58,53,99,62,19,97,64,74,37,63,34,67,95,93,68
98,11,24,14,89,52,22,55,75,47,42,44,78,38,91,96,81,65,87,94,69
53,99,62,54,97,92,64,37,63,34,67,27,26,95,84,93,68,48,35,76,45
94,24,89,55,75,69,14,52,44,73,81,91,58,53,99
76,45,47,38,94,24,89,55,12,75,69,65,14,52,13,22,44,78,96,73,87
63,37,68,89,24,38,11,84,27,94,92,95,93,34,64,45,35,67,57,74,26,76,47
54,26,53,19,27,91,58,87,92,57,37,74,99,95,93,62,84,68,97
89,55,12,69,65,14,52,13,22,78,96,98,73,87,91,42,58,53,99,62,54
57,74,37,63,34,67,27,84,68,48,35,76,45,38,24,55,12
97,64,57,67,45,47,24
55,95,27,35,75,47,68,94,34,38,63,45,37,48,84,93,11,89,69,26,76,12,24
63,27,26,95,93,68,35,76,45,47,38,11,94,89,65
93,68,48,45,38
75,69,13,22,96,73,87,62,92
54,92,74,34,27,84,68,35,11
91,42,58,62,54,97,92,57,74,63,34,95,84,93,48
53,19,87,13,64,74,96,14,73,58,92
63,67,84,35,76,47,89,55,65
55,38,47,68,24,75,12,94,37,74,34
35,62,37,54,58,68,99,42,19
97,57,37,67,27,84,68,35,76,38,24
24,89,75,69,65,14,52,13,22,98,87,91,42,58,62
63,73,42,19,37,62,64,58,92,78,81,74,57,44,22,91,13,54,87,97,98,53,96
48,68,37,58,76,34,19,57,35,63,74,84,97,53,99,27,54
57,37,34,67,84,93,48,24,89,55,12
99,42,27,98,19,54,73
98,81,99,67,95,63,57,92,64,62,27,19,74,53,97
96,37,54,99,62,53,52,92,74,64,97
54,68,38,19,76,95,45,48,74
69,52,13,58,53,54,92
13,22,78,96,98,73,81,87,42,58,53,99,62,54,19,97,92,64,57,37,63
27,95,48,55,69
38,94,24,69,44,96,73
74,68,37,26,35,48,62,58,27,93,34,95,92,53,97
47,68,24,52,65,14,98,69,94,44,75,38,22,96,45,11,13
12,47,48,38,24,34,84,37,26,93,94,11,63,74,89,68,45,35,75
12,75,52,44,78,98,87,42,53,62,54,19,97
47,89,12,96,98,81,42
67,27,26,95,84,93,68,48,35,76,45,47,38,11,94,24,89,55,12,75,69,65,52
74,99,81,64,98,13,52,87,19,42,22,54,58,97,92,37,91,62,44
73,81,87,91,42,58,53,99,62,54,19,97,92,64,57,74,63,34,67,27,26,95,84
99,53,91,13,12,22,65
73,81,87,91,58,53,99,62,54,19,97,92,64,57,74,37,63,34,67,27,26,95,84
92,64,57,74,37,63,34,67,27,26,95,84,93,68,48,35,76,45,47,38,94,24,89
87,91,42,53,62,19,97,64,37,26,84
26,74,68,47,93,12,76,11,94,95,57,37,55,89,27,63,24,48,35
69,65,14,52,13,22,44,96,98,73,81,87,91,42,58,53,99,62,54,19,97,92,64
63,92,74,64,68,62,93,57,27,97,84,42,35,48,95,26,34,19,53,99,37,67,58
62,27,84,68,74,99,93,47,76,64,26
12,91,65,75,87,19,62
89,75,69,65,14,99,54
94,76,37,67,38,11,55,95,93,34,45,89,63,35,64,68,47
45,93,47,94,95,65,69,75,11,89,14,84,13,35,12
24,89,55,69,65,14,78,98,81,91,62
74,35,93,57,99,19,54,97,37,95,58
45,93,26,27,48,54,95,84,67,35,19,34,97,62,37,68,47,99,76,57,63
74,63,34,26,95,84,93,48,35,45,47,94,12
96,42,73,22,65,53,52,57,78
35,57,38,63,12,76,67,94,37,89,95
35,76,45,47,38,11,94,24,75,69,65,14,52,13,44,78,96,73,81
35,76,45,47,38,11,24,55,12,75,65,14,52,22,44,96,98,73,81
13,52,54,96,78
81,87,42,58,53,99,62,19,97,92,64,57,74,37,63,34,67,27,95,84,93
74,64,84,42,37,57,99,62,58,92,27,67,97,95,53,68,91,63,26,54,48,93,34
84,26,37,63,76,45,94,35,95,69,11
37,26,93,64,97,67,38,95,68,94,11,76,27,92,24,63,84,48,47
97,99,62,87,13,44,42,19,22,78,52,37,96,64,92,73,98
67,27,95,84,68,48,35,76,11,94,12,75,69,65,52
38,55,65,48,94,68,45,69,14,35,84,89,13,95,76,12,47,24,93,22,26
44,96,81,87,91,42,53,99,62,19,97,92,37
81,87,42,58,53,99,62,54,19,97,92,64,57,74,37,63,34,67,27,26,95,84,93
13,98,81,87,58,99,54,19,97,57,63
34,67,27,68,35,76,47,38,94,24,55,12,69,65,14
53,65,91,69,96,22,73,87,75
55,75,69,65,14,22,44,78,96,81,91,42,58,53,19
92,62,54,95,57,27,74
96,98,75,94,13,87,78,73,99,12,65
11,94,24,89,69,14,52,13,22,44,78,96,73,81,87,91,42,58,53
84,34,81,97,58,63,87,54,53,74,57,92,93,91,62,19,42,26,95
57,35,27,74,37,64,47,94,97,68,48
64,37,63,34,26,48,35,24,55
67,76,27,55,34,89,11,14,68,47,35,26,95,65,75,12,69,94,93
38,48,94,27,68,67,95,89,12,52,84,24,26,11,75,76,69,35,14
38,65,75,14,35,55,76,68,52,98,44
27,26,68,11,89,12,65
74,27,99,54,26,19,95,37,92,64,42,98,67
87,91,58,53,99,62,19,97,92,64,37,67,27,95,84,93,68
63,55,74,94,84,11,57,27,38,48,12
65,64,19,69,96,52,81,14,53,44,87,73,42,13,54
76,38,89,22,11,24,47,84,13,69,75,45,78,44,94,52,14,93,65,55,48
24,96,47,87,44,52,78,98,81,75,42,13,89,12,65,14,94,69,91
35,89,45,78,94,24,38,22,14,96,98,55,44,75,65,11,52,12,68,48,69
42,14,81,98,65,91,53,75,52,96,12,78,69,44,54,99,89
12,75,69,14,52,13,44,96,73,87,91,42,58,53,99,62,54,19,97
44,96,73,81,87,91,42,58,53,99,62,54,19,92,57,74,63,34,67
27,35,45,47,11,94,89,12,13
19,97,92,64,57,74,37,63,67,27,26,95,84,93,68,48,35,76,45,47,38,11,94
91,53,11,96,94,42,12,78,69,22,73,87,55
14,52,22,78,98,73,42,99,62,19,97,64,74
55,22,44,81,87,58,19
38,11,94,24,89,55,12,75,69,65,14,52,13,22,44,78,96,98,73,81,91,42,58
24,12,14,53,62,91,55,75,99
98,74,34,92,62,53,42,26,19,58,64,73,37,87,97,27,81,96,63,99,57,67,54
89,11,13,98,12,47,55,45,44,65,52,38,94,14,22,87,81,78,69,91,73
34,67,26,84,93,68,48,35,76,45,47,11,24,89,12,75,69,65,14
75,69,65,14,52,13,22,78,98,87,91,42,58,53,62,54,19,97,92
42,99,78,73,98,54,52,13,96,55,69,14,89,22,44,62,81,65,58
76,45,47,38,11,94,89,55,75,69,14,52,13,22,44,78,98,73,81
74,37,95,84,45
98,47,45,78,68,13,76,22,11
65,99,44,73,53,55,91,52,98
26,84,68,48,35,76,11,89,69,13,22
38,67,47,63,34,76,92,74,37,24,48,95,94,84,57,89,64,93,45,68,35,27,11
53,63,87,73,44,91,13,92,62
47,38,11,94,24,89,55,12,75,69,65,14,52,13,22,44,78,98,73,81,87,91,42
69,52,44,78,96,98,87,91,42,58,62,54,19,92,64
22,47,98,12,65,52,89,11,78,94,75,45,96,38,69,68,35,48,76,13,14
38,11,94,24,89,55,75,13,44,78,98,73,91,42,58
81,67,78,96,92,58,97,62,99,98,87,64,44,34,73,63,53
99,62,54,19,92,64,57,74,63,34,67,26,95,68,48,76,45
57,74,67,27,84,68,48
11,24,55,12,13,22,96,73,91,42,53
91,14,78,62,42,74,58,52,22,81,97,92,53,44,98,99,54,64,73,19,96
42,58,99,92,57,74,37,95,84,68,35
57,76,48,27,94,38,47,93,67,37,63,64,74,11,84,45,19,92,95
63,44,19,34,99,67,37,87,92
19,35,92,68,34,47,93,26,57,95,74,37,54,48,45,27,84,11,67,97,38,64,76
84,93,68,48,35,45,47,38,11,94,24,89,55,12,75,69,65,14,52,13,22,44,78
12,94,84,48,45,24,76,68,52,13,14
95,45,93,27,35,34,37,24,63,38,26,94,68,48,76,89,75,11,69,84,47,67,55
84,93,68,94,24,89,55,12,75,69,65,14,52,44,78
73,58,57,99,92,53,19,91,37,81,34,63,87,67,54,78,64,27,96,42,62
57,63,42,54,96,44,87,78,19,67,99,74,62
34,19,84,67,74,93,94,48,27
11,94,24,89,55,12,75,69,65,14,52,13,44,78,96,98,73,81,87,91,42,58,53
48,76,75,93,44,38,89,35,94,24,45,13,14,78,47,68,69,96,65,12,11
34,67,27,26,84,93,68,48,35,76,45,47,38,11,94,24,55,75,69,65,14
11,24,89,55,12,75,69,65,52,13,22,44,78,98,73,81,87,91,42,58,53
92,64,37,27,26,95,93,35,45,47,38,11,89
44,89,13,65,11,94,76,69,48,14,35,22,73,75,55,38,45,78,96,98,52
92,64,26,48,47
52,69,38,55,27,11,12,95,94,84,13,76,45
45,47,38,11,94,24,89,55,12,75,69,65,52,13,22,44,78,96,98,73,81,87,91
52,44,91,99,19,97,37
65,47,89,38,55,75,96,91,12,45,98,13,44,69,52,94,87,81,24,14,78
93,68,48,35,38,11,94,24,89,12,69,65,14,52,22,44,96
24,47,95,12,68,76,14,67,75,48,89,84,69
24,89,55,12,75,69,65,14,52,13,22,78,96,81,87,42,58,53,62
67,35,92,93,76,99,54,58,48
38,11,94,89,55,65,13,22,44,78,96,98,81,87,91,42,58
91,99,54,19,97,92,37,63,34,67,26,95,84,68,48
48,45,47,94,14,13,73
24,22,98,38,76,47,75,12,81,55,35,94,78
73,81,42,65,53,58,94,75,96,52,98,69,24,12,89,55,44,13,11,91,87,78,14
95,84,93,68,48,35,76,45,47,38,94,24,89,75,69,65,14,52,13,22,44
37,19,99,64,26,92,74,57,63,81,42,62,53,54,98,67,73,34,96,97,87,27,91
42,14,98,96,53,75,99,44,19,65,13,62,54,73,12,69,58,97,78,87,91,81,22
34,99,27,26,19,92,97,42,63,87,96,81,37,58,73,67,54
99,54,57,34,27,26,95,93,68
98,75,76,47,13,48,14,38,44,68,94,12,96,69,52,78,35
38,97,24,11,74,76,47,84,95,63,67,35,94
34,27,95,75,69
22,44,78,96,42,58,53,57,74,37,34
55,81,13,47,98,11,12,96,65,89,73,22,69,35,76,75,52
19,97,92,64,57,74,63,26,95,93,68,48,35,45,38,11,94
34,73,42,78,57,53,63,92,27
73,98,99,78,58,54,37,53,91,19,44,87,63,62,42,22,64,13,57
27,94,12,76,69,45,55,68,67,14,38,26,89,75,84,93,35
91,42,58,99,54,64,57,74,63,67,26,95,84,93,48
81,73,96,87,53,99,42
54,81,98,22,87,65,91,53,96,52,55,69,19,99,44,73,12,62,78,75,13
42,58,53,99,62,54,19,97,92,64,57,74,34,67,27,26,95,84,93,68,48
26,68,54,97,48,57,67,91,53,42,37,93,58,63,34,19,84
92,67,84,93,37,53,27,57,95,64,63,91,19,81,62,99,74,97,26
53,99,62,54,19,92,64,37,34,67,26,95,84,93,68,48,35,76,45
81,42,19,92,37,67,27,26,93
11,89,47,24,91,87,12,22,52,81,98,45,65
14,65,24,12,38,75,96
68,58,91,53,99,26,92,27,87,67,37
52,48,95,47,44,84,11,93,69
76,45,47,38,11,24,89,55,12,75,65,14,52,13,22,44,78,96,98,81,87
35,26,47,67,74,93,94,45,34,27,95
73,34,44,98,64,22,19
53,74,63,34,95,48,45
91,42,58,53,99,62,54,19,97,92,64,74,63,67,27,26,95,93,48
92,38,93,37,11,63,45,27,74,95,34,64,89
67,35,84,34,62,74,57,48,27,63,97
44,42,58,53,99,54,64,57,67
91,19,37,87,22,92,74,57,96,81,34,62,98
24,35,84,93,69,89,65,47,63
84,93,68,48,35,76,45,47,11,94,24,89,55,12,75,69,65,13,22,44,78
38,11,94,24,89,55,12,75,69,65,14,13,22,78,96,98,73,81,91,42,58
75,65,98,73,87,91,54
38,93,97,92,95,19,34,37,57,68,76,74,27,45,54,67,62,48,64,84,35
89,55,12,75,69,65,14,22,44,78,98,73,81,87,91,42,58,53,99,62,54
26,95,84,93,68,48,35,76,45,38,11,94,24,89,55,12,75,69,65,14,13
53,54,52,97,22,99,65,14,69,12,19,91,58,98,42,44,87,62,96,78,13
48,93,94,67,89,47,38,64,57,35,24,74,26,63,55,68,11,37,76
64,57,74,63,34,67,26,48,76,45,47,38,94,89,55
73,89,13,44,14,47,76,75,65,45,12,52,24,69,78,35,11,94,81,96,98
84,93,48,76,45,47,38,11,94,24,89,55,12,69,65,14,13,22,44
97,54,87,19,91,75,69,99,52,96,12,13,73,62,65
24,69,87,78,55,13,58,22,11,96,12,65,52,89,38
62,19,74,27,95,84,38
58,99,62,54,97,92,64,57,74,63,34,67,27,95,84,93,68,48,76
14,13,22,87,42,58,53,62,54,97,92,57,74
48,97,26,38,84,34,27,63,94,95,57,93,76,35,64,37,19,45,68
27,69,75,76,12,95,47,68,67,45,89,55,38,35,93,94,84,14,34,24,48
87,52,55,14,13,47,94,24,69,65,11,78,91,45,38,89,81,98,73,75,22,12,44
52,13,73,87,91,54,19,97,37
34,67,27,95,84,93,48,45,38,11,94,12,75,65,14`

// setting up an object where the key is a number, and it's value is a set of all numbers that can't come before it
const ruleHash = {};

inputRules.split("\n").map(pair => pair.split("|")).forEach(arr => {
    if (arr) {
        if (!ruleHash[arr[0]]) {
            ruleHash[arr[0]] = new Set();
        }
        ruleHash[arr[0]].add(arr[1]);
    }
});

// helper function to check order of each update
const checkUpdate = (updateArr) => {
    let seen = new Set();
    for (let i = 0; i < updateArr.length; i++) {
        let currPage = updateArr[i];
        // VVV node v22 feature!! VVV
        if (!seen.isDisjointFrom(ruleHash[currPage])) return false;
        seen.add(currPage);
    }
    return true;
};

// setting up sum variable for pt 1
let count = 0;

// parsing the updates from the input string
inputUpdates.split("\n").forEach(update => {
    let updateArr = update.split(",");
    // checking update order
    if (checkUpdate(updateArr)) {
        // if ok, find the midpoint number and add to count
        count += Number(updateArr[(updateArr.length - 1) / 2]);
    }
});

console.log(count); // 6505

/*
--- Part Two ---
While the Elves get to work printing the correctly-ordered updates, you have a little time to fix the rest of them.

For each of the incorrectly-ordered updates, use the page ordering rules to put the page numbers in the right order. For the above example, here are the three incorrectly-ordered updates and their correct orderings:

75,97,47,61,53 becomes 97,75,47,61,53.
61,13,29 becomes 61,29,13.
97,13,75,29,47 becomes 97,75,47,29,13.
After taking only the incorrectly-ordered updates and ordering them correctly, their middle page numbers are 47, 29, and 47. Adding these together produces 123.

Find the updates which are not in the correct order. What do you get if you add up the middle page numbers after correctly ordering just those updates?
*/

// helper function to fix a bad update
const fixUpdate = (update) => {
    let remaining = new Set(update);
    let fixed = [];
    while (remaining.size) {
        for (let i = 0; i < update.length; i++) {
            let page = update[i];
            // if already added, let's continue
            if (fixed.includes(page)) continue;
            // if there's no overlap between the numbers that must be after this page and the remaining numbers
            if (remaining.isDisjointFrom(ruleHash[page])) {
                // we will build the fixed update from back to front
                fixed.unshift(page);
                // now that we've handled this page, we can remove from remaining set
                remaining.delete(page);
                // and keep going
                break;
            }
        }
    }
    return fixed;
};

let fixedCount = 0;


// parsing the updates from the input string
inputUpdates.split("\n").forEach(update => {
    let updateArr = update.split(",");
    // checking update order
    if (!checkUpdate(updateArr)) {
        // if bad, fix order
        const fixedUpdate = fixUpdate(updateArr);
        // add midpoint val to counter
        fixedCount += Number(fixedUpdate[(fixedUpdate.length - 1) / 2]);
    }
});

console.log(fixedCount); // 6897