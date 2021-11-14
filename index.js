window.onload = function () {

    /**
     * 栈
     * @type {Array}
     */
    const stack = [];
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);

    // while (stack.length) {
    //     console.log('stack的栈顶元素是', stack[stack.length - 1])
    //     stack.pop()
    // }

    /**
     * 二叉树遍历
     * @param root
     */
    //先序遍历
    // 所有遍历函数的入参都是树的根结点队形
    function preorder(root) {
        if (!root) {
            return
        }
        //获取当前遍历的结点
        console.log('当前遍历的结点是', root.val)
        //递归遍历左子树
        preorder(root.left);
        //递归遍历右子树
        preorder(root.right)
    }

    // 中序遍历
    function inorder(root) {
        if (!root) {
            return
        }
        //遍历左树
        inorder(root.left)
        console.log('当前遍历的结点', root.val);
        inorder(root.right)
    }

    // 后序遍历
    function postorder(root) {
        if (!root) {
            return
        }
        postorder(root.left);
        postorder(root.right);
        console.log('当前遍历的结点', root.val)
    }

    const root = {
        val: 'A',
        left: {
            val: 'B',
            left: {
                val: 'D'
            },
            right: {
                val: 'E'
            }
        },
        right: {
            val: 'C',
            right: {
                val: 'F'
            }
        }
    };
    // 先序遍历
    //preorder(root)
    // 中序遍历
    // inorder(root)
    // postorder(root)

    /**
     * 数组算法题1：两数求和问题
     * 给定一个整数数组nums和一个目标taget请你在该数组中找出和为目标值的那两个整数，并返回数组下标；
     * 第一反应是用双层循环，但是双循环的时间复杂度为O(n^2)
     * 解：利用空间换时间，使用Map数据结构+单循环；在遍历数组的过程中，增加一个map里记录已经遍历的数字以及对应的索引值，
     * 然后每遍历到一个新数字的时候，都回到map里去查询targetnum与该树的差是否已在前面的数字中出现过
     * 结论：几乎所有的求和问题，都可以转换为求差问题，通过使用求和变为求差问题会变得简单
     */
    function twoSum(nums, targetNum) {
        let map = {};
        let len = nums.length;
        for (let i = 0; i < len; i++) {
            let diff = targetNum - nums[i];
            if (map[diff] !== undefined) {
                return [map[diff], i];
            } else {
                map[nums[i]] = i
            }
        }
    }

    // const xb = twoSum([2, 8, 7, 3, 11], 9);
    // console.log(xb)

    /**
     * es6版本
     */
    function twoSumEs6(nums, targetNum) {
        const map = new Map();
        const len = nums.length;
        for (let i = 0; i < len; i++) {
            let diff = targetNum - nums[i];
            let val = map.get(diff);
            if (val !== undefined) {
                return [val, i]
            } else {
                let newval = nums[i];
                map.set(newval, i);
            }
        }
    }

    // const res = twoSumEs6([2, 8, 7, 3, 11], 9);
    // console.log(res)

    /**
     * 合并两个有序整数数组nums1和nums2，请你将nums2合并到nums1中，是nums1成为为一个有序数组
     * 说明：初始化nums1和nums2的元素数量分别为m和n
     * 思想：双指针法 + 从后向前遍历
     * 为何要从后向前？因为num1作为容器，前面的坑是有内容的，从前往后填补，会产生覆盖
     * nums1=[1,2,3,0,0,0] m=3
     * nums2=[2,5,6] n=3
     * 输出[1,2,2,3,5,6]
     */
    function merge(num1, num1Len, num2, num2Len) {
        let num1Point = num1Len - 1;
        let num2Point = num2Len - 1;
        // totalPoint指向要放数据的位置
        let totalPoint = num1Len + num2Len - 1;
        while (num1Point >= 0 && num2Point >= 0) {
            if (num1[num1Point] >= num2[num2Point]) {
                num1[totalPoint] = num1[num1Point];
                num1Point--;
                totalPoint--
            } else {
                num1[totalPoint] = num2[num2Point];
                num2Point--;
                totalPoint--
            }
        }
        // 当num1里的数据比较偏大，可能出现num1的数据都补充到后面了，num2的数据指针还没走完，
        // 这时直接遍历num2把值付给totalpoint即可，因为num2已经是有序的了，从后往前遍历，是从大到小拿值的，结果符合要求
        while (num2Point >= 0) {
            num1[totalPoint] = num2[num2Point];
            num2Point--;
            totalPoint--;
        }
        return num1;
    }

    // let res = merge([8, 9, 11, 0, 0, 0], 3, [5, 7, 9], 3);
    // console.log(res)

    /**
     * copy数组+双指针+从前往后遍历
     */
    function mergeCopy(num1, num1Len, num2, num2Len) {
        let copyNum3 = [...num1];
        let num1Point = 0;
        let num2Point = 0;
        let copyNum3Point = 0;
        while (num1Point < num1Len && num2Point < num2Len) {
            if (num1[num1Point] <= num2[num2Point]) {
                copyNum3[copyNum3Point] = num1[num1Point];
                copyNum3Point++;
                num1Point++
            } else {
                copyNum3[copyNum3Point] = num2[num2Point];
                copyNum3Point++;
                num2Point++
            }
        }
        //处理num2遍历完了，num1没有遍历完的情况
        while (num1Point < num1Len) {
            copyNum3[copyNum3Point] = num1[num1Point];
            copyNum3Point++;
            num1Point++;
        }
        //处理num1遍历完了，num2没有遍历完的情况
        while (num2Point < num2Len) {
            copyNum3[copyNum3Point] = num2[num2Point];
            copyNum3Point++;
            num2Point++;
        }
        return copyNum3;

    }

    // let copyres = mergeCopy([8, 9, 11], 3, [5, 7, 9], 3);
    // console.log(copyres)

    /**
     * 三数求和问题:给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
     * 例如： nums = [-2, 1, 0, 2, -1, 3]
     * 思想：在求和、比大小的数组题目中都可用双指针，但是大前提是：该数组必须是有序，否则双指针根本无法帮我们缩小定位范围，无意义
     * 1、先排序
     * 2、定义3个指针，1个固定数的指针，1个左针，一个右针
     * 3、对数组遍历，每次遍历到哪个数字，就固定哪个数字
     * 4、避免计算出重复的数组，到当前i位置时，看下上次遍历过的i-1位置是否和当前值相同，如果相同则肯定包含了，直接跳出循环
     * 4、在while循环里操作左右双指针
     * 5、计算固定数+左针+右针是否为0
     * 6、如果为0，则就是我们想要的结果，放入结果数组中，之后左指针加1；右指针减1
     * 7、如果大于0，说明右指针所在当前位置数值偏大，这时把右指针减1位
     * 8、如果小于0，说明左指针所在当前位置数值偏小，这时把左指针加1位
     */
    function treeSum(nums) {
        if (nums.length < 3) return;
        nums = nums.sort((a, b) => a - b);
        let len = nums.length;
        let res = [];
        for (let i = 0; i < len - 2; i++) {
            let leftP = i + 1;
            let rightP = len - 1;
            //避免重复数组，例如[-4,-1,-1,0,1,2]
            //在nums[2]为-1，这样它的范围是小的，前面nums[1]的范围大，能遍历的都遍历了，所以它再遍历肯定是重复的了，所以跳过
            if (nums[i] === nums[i - 1]) {
                continue;
            }
            while (leftP < rightP) {
                let sum = nums[i] + nums[leftP] + nums[rightP];
                if (sum === 0) {
                    res.push([nums[i], nums[leftP], nums[rightP]]);
                    leftP++;
                    rightP--;
                }
                if (sum > 0) {
                    rightP--;
                }
                if (sum < 0) {
                    leftP++;
                }
            }
        }
        return res;
    }

    // let treeSumRes=treeSum([-2, 1, 0, 2, -1, 3]);
    // console.log(treeSumRes)

    /**
     * 验证回文字符串1 给定一个字符串，判断它是否是回文字符串
     * 解法1：var restr=str.split('').reverse().join('')
     * restr === str ??
     *
     * 解法2：使用双指针
     * @param str
     */
    function parallerom(str) {
        let leftp = 0;
        let rightp = str.length - 1;
        while (leftp < rightp) {
            if (str[leftp] !== str[rightp]) return false;
            leftp++;
            rightp--;
        }
        return true
    }

    // let res = parallerom('edfoljfde');
    // console.log(res)

    /**
     * 回文字符串的衍生问题
     * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
     * 思路，在判断是否是回文字符串，如果不对称了，再多给一次机会，判断left+1指针位置的值是否和right值相同或者right-1的值是否和left相同
     * @param str
     */
    function validParallelStr(str) {
        // 工具方法：检查两个字符是否相当
        function parallerStr(left, right) {
            while (left < right) {
                if (str[left] !== str[right]) {
                    return false
                }
                left++;
                right++;
            }
            return true
        }

        let leftP = 0;
        let rightP = str.length - 1;
        while (leftP < rightP) {
            // 不相当的情况下，意味着不对称发生了，可以删掉试试的操作点
            // 分别对左指针加1和右指针减1，尝试进行跳过，看看在[left+1,right]或[left,right+1]的字符是否是对称相当的
            // 如果是，则可以删掉被跳过的字符
            if (str[leftP] !== str[rightP]) {
                const res = parallerStr(leftP + 1, rightP) || parallerStr(leftP, rightP - 1);
                return res;
            }
            leftP++;
            rightP--
        }
        return true
    }

    const resVal = validParallelStr('deoued');
    console.log(resVal);

    /**
     * 链表的合并:将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。
     * 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4
     * 思路：处理链表的本质，是处理链表结点之间的指针关系；两个链表和为一个链表，补齐双方之间的结点next指针指向关系，就能达到目的。
     * 1、新定义一个链表来串联这两个链表head，在赋值一份引用给cur，用来标记当前的指向，方便过程中加入元素；head用来最终的访问
     * 2、串联之前先比较两个链表位置的数哪个小，就把哪个先串起来
     * 3、添加之后，移动被传入的链表的指向；同时移动新定义的用来承载的链表指向
     * 4、兜底：有可能一个先被串联完了，另一个没有，分别做下收尾工作，因为剩下的肯定是比较大的链表数据，直接穿链在最后即可
     */
    // 定义链表数据结构
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    function MergeTwoList(list1, list2) {
        let head = new ListNode();
        let cur = head;
        while (list1 && list2) {
            if (list1.val < list2.val) {
                cur.next = list1;
                list1 = list1.next;
            } else {
                cur.next = list2;
                list2 = list2.next;
            }
            cur = cur.next
        }

        // 处理链表不等长的情况
        if (list1 !== null) {
            cur.next = list1
        }
        if (list2 !== null) {
            cur.next = list2
        }
        return head.next;
    }

    //第一组链表
    let list1 = new ListNode(1);
    let list2 = new ListNode(2);
    let list3 = new ListNode(4);
    list1.next = list2;
    list2.next = list3;

    //第二组链表
    let list4 = new ListNode(1);
    let list5 = new ListNode(3);
    let list6 = new ListNode(4);
    list4.next = list5;
    list5.next = list6;

    // let res = MergeTwoList(list1, list4);
    // console.log(res);
    /**
     * 链表结点的删除：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
     * 思路：因为已经排序了，所以直接比较前后是否相同即可
     * 删除一个目标结点就是把这个结点的前驱结点next指针往后指一格
     * 输入: 1->1->2
     * 输出: 1->2
     * 输入: 1->1->2->3->3
     * 输出: 1->2->3
     */
    function delCommon(list) {
        let copylist = list;
        while (list) {
            let val = list.val;
            let nextval = list.next && list.next.val;
            if (val === nextval) {
                list.next = list.next.next;
            }
            list = list.next;

        }
        return copylist
    }

    // 链表数据
    let list7 = new ListNode(1);
    let list8 = new ListNode(1);
    let list9 = new ListNode(2);
    list7.next = list8;
    list8.next = list9;
    // let res = delCommon(list7);
    // console.log(res)

    /**
     * 快慢指针：删除链表的倒数第 N 个结点
     * 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
     * 给定一个链表: 1->2->3->4->5, 和 n = 2.
     * 当删除了倒数第二个结点后，链表变为 1->2->3->5.
     * 思路：dummy 结点的使用，它可以帮我们处理掉头结点为空的边界问题，帮助我们简化解题过程。
     * 这道题的难点实际在于这个“倒数第 N 个”如何定位。
     * 方法1：“倒数”变“正数”，考虑到咱们的遍历不可能从后往前走，因此这个“倒数第 N 个” 咱们完全可以转换为“正数第 len - n + 1"个
     * 我们可以直接遍历两趟：第一趟，设置一个变量 count = 0，每遍历到一个不为空的结点，count 就加 1，一直遍历到链表结束为止，
     * 得出链表的总长度 len；根据这个总长度，咱们就可以算出倒数第 n 个到底是正数第几个了（M = len - n + 1）
     * 那么我们遍历到第 M - 1 个结点的时候就可以停下来，执行删除操作
     *
     * 方法2：快慢指针
     * 1、定义dummy结点、定义fast快指针、定义slow慢指针，初始化都定位到dummy指针
     * 2、快指针先闷头出发，走到第N个停下，这里n=2；
     * 3、然后快慢指针一起出发
     * 4、知道快指针到了最后一个结点停下，慢指针同时也停下
     * 5、此时慢指针所指的位置就是倒数n位置的前一个结点
     * 6、这样就可以方便地基于这个结点删除倒数n的结点
     */
    function removeNothFromEnd(list, n) {
        let dummy = new ListNode();
        dummy.next = list;
        let fast = dummy;
        let slow = dummy;
        // 先让快指针走n个位置后停下
        while (n > 0) {
            fast = fast.next;
            n--;
        }
        //当快指针的next不为空说明后面还有结点，那么快慢指针一起向前走
        while (fast.next) {
            fast = fast.next;
            slow = slow.next
        }
        // slow现在所在的位置就是要删除的n结点的前驱
        slow.next = slow.next.next;
        // 为何返回dummy不返回list，因为在过程中操作的是fast和slow，他们分别引用了dummy
        return dummy.next;
    }

    let list10 = new ListNode(1);
    let list11 = new ListNode(2);
    let list12 = new ListNode(3);
    let list13 = new ListNode(4);
    let list14 = new ListNode(5);
    list10.next = list11;
    list11.next = list12;
    list12.next = list13;
    list13.next = list14;
    // let res = removeNothFromEnd(list10, 2);
    // console.log(res)

    /**
     * 多指针法——链表的反转：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。
     * 输入: 1->2->3->4->5->NULL
     * 输出: 5->4->3->2->1->NULL
     */
    function reverselist(list) {
        let pre = null;
        let cur = list;
        while (cur) {
            let temp = cur.next;
            cur.next = pre;
            pre = cur;
            cur = temp;
        }
        return pre;
    }

    let list15 = new ListNode(1);
    let list16 = new ListNode(2);
    let list17 = new ListNode(3);
    let list18 = new ListNode(4);
    let list19 = new ListNode(5);
    list15.next = list16;
    list16.next = list17;
    list17.next = list18;
    list18.next = list19;
    // let res = reverselist(list15);
    // console.log(res);

    /**
     * 局部反转一个链表
     */

    /**
     * 定义一个环状链表
     */
    let list20 = new ListNode(20);
    let list21 = new ListNode(21);
    let list22 = new ListNode(22);
    let list23 = new ListNode(23);
    let list24 = new ListNode(24);
    list20.next = list21;
    list21.next = list22;
    list22.next = list23;
    list23.next = list24;
    list24.next = list22;

    /**
     * 环形链表基本问题——如何判断链表是否成环？
     * 借助flag标识别
     */
    function isCycleList(head) {
        if (!head.next) {
            return '只有一个结点，没有成环'
        }
        while (head.next) {
            if (head.flag) {
                return head
            } else {
                head.flag = true;
                head = head.next
            }
        }
        return false
    }

    // let res = isCycleList(list20);
    // console.log(res)
    // let list25 = new ListNode(25);
    // let nores = isCycleList(list25)
    // console.log(nores)

    /**
     * 栈应用：有效括号”问题
     * 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
     * 输入: "()"输出: true
     * 输入: "()[]{}"输出: true
     * 输入: "(]"输出: false
     * 输入: "{[]}"输出: true
     * 思路：一个规律：题目中若涉及括号问题，则很有可能和栈相关。
     * 有效括号意味着对称性
     * 1、循环给定的字符串
     * 2、遇到( [ {左边的，就放入栈[]里
     * 3、遇到) ] }右边的，就从栈顶部里拿出来对比
     * 4、如果不相等，直接返回false
     * 5、如果相等，（这里要比较相等需要借助一个map来取对应的值是否相等）[].pop()顶部出栈，消除栈顶元素，接着等下一个元素做比较
     * 6、做收尾工作：循环后，判断栈里是否还有元素，有的化表示没有与它匹配的，返回fasle
     * 7、最终以上都没有返回fasle的话，返回一个true
     */
    function isValidKH(str) {
        let map = {
            '(': ')',
            '[': ']',
            '{': '}'
        };

        let stack = [];
        let len = str.length;
        for (let i = 0; i < len; i++) {
            let res = str[i];
            if (res === '[' || res === '(' || res === '{') {
                stack.push(res)
            }
            if (res == ']' || res === ')' || res === '}') {
                if (stack.length === 0) return false;
                if (res === map[stack[stack.length - 1]]) {
                    stack.pop();
                } else {
                    return false
                }
            }
        }
        if (stack.length > 0) {
            return false
        }
        return true
    }

    // let res = isValidKH('[{()}]');
    // console.log(res)
    // let res1 = isValidKH('[2{(999o}]');
    // console.log('res1',res1)

    /**
     * 栈问题进阶-每日温度问题：根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。
     * 如果之后都不会升高，请在该位置用 0 来代替。
     * 给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
     * 思路：
     * 1、先初始化一个栈，初始值都为0
     * 2、循环temperatures数组，如果该值大于栈顶元素，则栈顶元素的生温日到了，根据栈顶元素的值和当前元素的下标做减法，得到差就是升温日
     * 3、如果该值小于栈顶元素，那么把当前元素也押入栈用，注意押入的是当前元素的下标
     */
    function temperatureCom(tempArr) {
        let len = tempArr.length;
        let res = new Array(len).fill(0);
        let stack = [];
        for (let i = 0; i < len; i++) {
            let topVal = stack[stack.length - 1]; //存的是数组的下标,取值通过tempArr[topval]
            if (tempArr[i] > tempArr[topVal]) {
                let index = stack.pop();
                res[index] = i - topVal;
            } else {
                stack.push(i)
            }
        }
        return res;
    }

    // let result=temperatureCom([73, 74, 75, 71, 69, 72, 76, 73]);
    // console.log(result)

    /**
     * 栈的设计——“最小栈”问题:设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
     * 关键在于如何获取最小元素？常规想法，初始化一个Infinity最大值，遍历stack，如果比它小就放进入，依次比较，最后放入的值最小
     * 但是这种的时间复杂度为O(n)需要遍历
     * 方法2：定义一个辅助栈stack2，每次入stack栈后，判断stack2的栈顶是否最小，如果
     */
    const MinStack = function () {
        this.stack = [];
        this.minStack = [];
    }
    MinStack.prototype.push = function (val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || this.minStack[this.minStack.length - 1] > val) {
            this.minStack.push(val)
        }
    };
    MinStack.prototype.top = function () {
        return this.stack[this.stack.length - 1]
    };
    MinStack.prototype.pop = function () {
        let popVal = this.stack.pop();
        if (popVal === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop()
        }
    };
    MinStack.prototype.getMin = function () {
        return this.minStack[this.minStack.length - 1]
    }

    // let mins = new MinStack();
    // mins.push(3);
    // mins.push(10);
    // mins.push(2);
    // mins.push(8);
    // mins.push(9);
    // console.log('当前stack为',mins.stack)
    // console.log('当前minstack为',mins.minStack)
    // console.log('top is',mins.top())
    // console.log('getMin is',mins.getMin());
    // mins.pop();
    // mins.pop();
    // mins.pop();
    // console.log('-------------')
    // console.log('当前stack为',mins.stack)
    // console.log('当前minstack为',mins.minStack)
    // console.log('top is',mins.top())
    // console.log('getMin is',mins.getMin());

    /**
     * 利用栈实现队列
     * push(x) -- 将一个元素放入队列的尾部。
     * pop() -- 从队列首部移除元素。
     * peek() -- 返回队列首部的元素。
     * empty() -- 返回队列是否为空。
     * 思路：栈和队列的主要区别，栈 先进后出 队列 先进先出 让栈实现先进先出的效果：利用两个栈来实现
     */
    function QueneFromStack() {
        this.stack1 = [];
        this.stack2 = [];
    }

    QueneFromStack.prototype.push = function (val) {
        this.stack1.push(val)
    }
    QueneFromStack.prototype.addStack2 = function () {
        if (!this.stack2.length) {
            let stack1Len = this.stack1.length;
            while (stack1Len > 0) {
                this.stack2.push(this.stack1.pop());
                stack1Len--;
            }
        }
    }
    QueneFromStack.prototype.pop = function () {
        this.addStack2()
        return this.stack2.pop();
    }
    QueneFromStack.prototype.peek = function () {
        this.addStack2();
        let stack2len = this.stack2.length;
        return stack2len && this.stack2[stack2len - 1]
    }
    QueneFromStack.prototype.empty = function () {
        return !this.stack1.length && !this.stack2.length
    }
    // let que = new QueneFromStack();
    // que.push(1);
    // que.push(2);
    // que.push(3);
    // que.push(4);
    // console.log('curren:', que);
    // que.pop();
    // console.log('pop后', que);
    // console.log('peek', que.peek());
    // console.log('empty', que.empty())

    /**
     * 滑动窗口：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
     * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
     * 思想：我们在遍历数组的过程当中，约束一个窗口——窗口的本质其实就是一个范围
     * 1、约束范围，可以用双指针。因此我这里定义一个 left 左指针、定义一个 right 右指针，分别指向窗口的两端即可：
     * 2、接下来我们可以把这个窗口里的数字取出来，直接遍历一遍、求出最大值，然后把最大值存进结果数组。这样第一个窗口的最大值就有了。
     * 3、接着按照题意，窗口每次前进一步（左右指针每次一起往前走一步）
     */
    function maxSlidingWindow(arr, size) {
        let left = 0;
        let right = size - 1;
        let len = arr.length;
        let res = [];
        for (let i = 0; i < len; i++) {
            while (right < len) {
                let max = maxRes(arr, left, right);
                res.push(max);
                left++;
                right++;
            }
        }

        function maxRes(arr, left, right) {
            let max = arr[left];
            for (let i = left; i <= right; i++) {
                if (arr[i] > max) max = arr[i];
            }
            return max;
        }

        return res;
    }

    // let res = maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
    // console.log(res)

    /**
     * 深度优先遍历 DFS
     * 深度优先搜索的本质——栈结构
     */

    function DFS(root) {
        if (!root) return;
        console.log(root.val);
        DFS(root.left)
        DFS(root.right)
    }

    // DFS(root);

    /**
     * 广度优先遍历 BFS
     * 广度优先遍历的本质——队列结构
     * BFS+队列
     */
    function BFS(root) {
        if (!root) return;
        let queue = [];
        queue.push(root);
        while (queue.length) {
            const firstEle = queue[0];
            console.log(firstEle.val);
            if (firstEle.left) {
                queue.push(firstEle.left)
            }
            if (firstEle.right) {
                queue.push(firstEle.right)
            }
            queue.shift();
        }
    }

    // BFS(root);

    /**
     * 给定一个二叉树，返回它的前序（先序）遍历序列。不用递归（子调用），通过迭代算法完成
     * 思路：利用栈:
     * 1、先把根结点入栈，然后弹出，记录弹出值
     * 2、访问右子树，有值入栈；访问左子树，有值入展
     * 3、在执行第一步
     */
    function preorderTraveral(root) {
        if (!root) {
            return
        }
        let res = [];
        let stack = [];
        stack.push(root);
        while (stack.length > 0) {
            let node = stack.pop();
            res.push(node.val);
            // 因为出栈的时候需要让左子树先出，所以入栈的时候要先让右子树先入
            if (node.right) {
                stack.push(node.right)
            }
            if (node.left) {
                stack.push(node.left)
            }
        }
        return res;
    }

    let res = preorderTraveral(root);

    // console.log('先序遍历', res);

    /**
     * 中序遍历：左 右 根
     * 思路：因为根跑到了最后，所以我们把入栈的方式从push该为unshift
     * 根先入栈，然后弹出，第二出的是右，那先把左放进去，
     */
    function postorderTraveral(root) {
        if (!root) return;
        let res = [];
        let stack = [];
        stack.push(root);
        while (stack.length) {
            let top = stack.pop();
            res.unshift(top.val);
            if (top.left) {
                stack.push(top.left)
            }
            if (top.right) {
                stack.push(top.right)
            }
        }
        return res;
    }

    let respost = postorderTraveral(root);

    // console.log('后序遍历', respost);

    /**
     * 中序遍历
     * 思路：
     * 1、两个循环：内层寻找左叶子的过程中，把途径的所有结点都记录到stack中
     * 2、记录完，才走的外层while的剩余逻辑中，这部分逻辑的作用是从最左的叶子结点开始
     * 一层层回溯遍历左孩子的父结点和右侧兄弟
     * 3、最外层的cur的存在性：
     * 1）初始态，cur指向root，只有root不为空，就看书左叶子结点的寻找之旅，cur始终指向当前遍历到的左孩子
     * 2）第一波内层while循环结束后，cur开始承担中序遍历的遍历游标职责
     * cur始终指向当前栈顶元素
     * ......
     */
    function inorderTraversal(root) {
        let res = [];
        let stack = [];
        // 游标
        let cur = root;
        while (cur || stack.length) {
            //记录左叶子结点
            while (cur) {
                stack.push(cur);
                cur = cur.left;//搜索当前结点的左孩子
            }
            //取出栈顶元素
            cur = stack.pop();
            res.push((cur.val));
            cur = cur.right;
        }
        return res;
    }

    let resinorder = inorderTraversal(root);

    // console.log('中序遍历',resinorder)

    /**
     * 层序遍历 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
     * 二叉树：[3,9,20,null,null,15,7],
     * 返回 [
     [3],
     [9,20],
     [15,7]
     ]
     */
    function levelOrder(root) {
        let res = [];
        let queue = [];
        queue.push(root);
        while (queue.length) {
            let level = [];
            let len = queue.length;
            for (let i = 0; i < len; i++) {
                let top = queue.shift();
                level.push(top.val);
                if (top.left) {
                    queue.push(top.left)
                }
                if (top.right) {
                    queue.push(top.right)
                }
            }
            res.push(level)
        }
        return res;
    }

    let reslevorder = levelOrder(root);

    // console.log('层序遍历', reslevorder);

    /**
     * 反转二叉树
     4
     /   \
     2     7
     / \   / \
     1   3 6   9
     输出
     4
     /   \
     7     2
     / \   / \
     9   6 3   1
     */
    function reverseTree(root) {
        if (!root) return;
        let temp = root.left;
        root.left = root.right;
        root.right = temp;
        reverseTree(root.left);
        reverseTree(root.right);
        return root
    }

    // console.log('反转二叉树',reverseTree(root));

    /**
     * 二叉搜索树，有很多别名，比如排序二叉树、二叉查找树等等。
     * 查找数据域为某一特定值的结点
     */
    function search(root, n) {
        if (!root) return;
        if (root.val === n) {
            console.log('二叉搜索树里找' + n, root)
        } else if (root.val > n) {
            search(root.left, n)
        } else {
            search(root.right, n)
        }
    }

    const tree = {
        val: 8,
        left: {
            val: 6,
            left: {
                val: 2
            },
            right: {
                val: 4
            }
        },
        right: {
            val: 10,
            right: {
                val: 13
            }
        }
    };
    search(tree, 13);

    /**
     * 冒泡排序
     * 思路：
     * 冒泡排序的过程，就是从第一个元素开始，重复比较相邻的两个项，若第一项比第二项更大，则交换两者的位置；反之不动。
     * 每一轮操作，都会将这一轮中最大的元素放置到数组的末尾。假如数组的长度是 n，那么当我们重复完 n 轮的时候，整个数组就有序了。
     * [5, 3, 2, 4, 1]
     */
    function betterBubbleSort(arr) {
        let len = arr.length;
        // 使用flag减少比较次数，当一轮下来，没有发生过交换证明是有序的，则不许要再比了，这时的空间复杂度为O(n)
        // 最复杂的空间复杂度是O(n^2)
        let flag = false;
        // 最外层记录次数
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    flag = true;
                }
            }
            if (!flag) return arr;
        }

        return arr;
    }

    // let resbubblesort = betterBubbleSort([5, 3, 2, 4, 1]);
    // console.log('冒泡排序结果为', resbubblesort)
    /**
     * 选择排序
     * 选择排序的关键字是“最小值”：循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；然后缩小排序范围，继续重复以上操作，直至数组完全有序为止。
     * 思路：
     * 1、第一层循环用来交换每次遍历出最小值后进行位置的交换
     * 2、第二层循环用来找最小元素
     * 3、找最小元素需要两个关键点，一是当前最小元素是什么，二是最小元素值的位置是哪里，找到位置后，外成循环就可以快速定位到最小元素了
     * 3、第二层的循环起点是外层循环的值，前面已经排好的不要遍历了
     * 4、交换前记得再检查下是否有了新的最小值，否则会无意义交换造成错乱
     */
    function selectSort(arr) {
        let len = arr.length;
        // 外循环控制和最小值的交换
        for (let i = 0; i < len; i++) {
            let min = arr[i];
            let minpos = i;
            //内循环负责找到最小值
            for (let j = i; j < len; j++) {
                if (arr[j] < min) {
                    min = arr[j];
                    minpos = j
                }
            }

            // 确保一下最小值确实发生变化了，否则会进行无意义交换
            if (min < arr[i]) {
                [arr[i], arr[minpos]] = [arr[minpos], arr[i]]
                // let temp = arr[minpos];
                // arr[minpos] = arr[i];
                // arr[i] = temp;
            }
        }
        console.log('选择排序结果', arr)
    }

    // selectSort([5, 3, 2, 55, 6, 34, 4, 1]);

    /**
     * 插入排序
     * 插入排序的核心思想是“找到元素在它前面那个序列中的正确位置”。
     * 具体来说，插入排序所有的操作都基于一个这样的前提：当前元素前面的序列是有序的。基于这个前提，从后往前去寻找当前元素在前面那个序列里的正确位置。
     */
    function insertSort(arr) {
        let len = arr.length;
        // 控制当前元素是否进行插入
        for (let i = 1; i < len; i++) {
            let j = i;
            let temp = arr[i];
            while (j > 0 && arr[j - 1] > temp) {
                arr[j] = arr[j - 1];
                j--;
            }
            arr[j] = temp
        }
        console.log('插入排序后', arr)
    }

    // insertSort([5, 3, 2, 55, 6, 34, 4, 1])

    /**
     * “分治”思想（待完善）
     * 归并排序
     */
    // 分
    function mergeSort(arr) {
        let len = arr.length;
        if (len === 1) return arr;
        const mid = Math.floor(len / 2);
        const leftArr = mergeSort(arr.splice(0, mid));
        const rightArr = mergeSort(arr.splice(mid, len));
        arr = mergeArr(leftArr, rightArr);
        return arr;
    }

    function mergeArr(leftArr, rightArr) {

    }

    /**
     * 快速排序
     */
    function quickSort(arr) {
        if (arr.length <= 1) return arr;
        let pivotIndex = Math.floor(arr.length / 2);
        //选择"基准"（pivot），并将其与原数组分离
        let pivot = arr.splice(pivotIndex, 1)[0];
        // var pivot=arr[pivotIndex];
        let left = [];
        let right = [];
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat([pivot], quickSort(right))
    }
    console.log('快排', quickSort([3, 5, 1, 3, 22, 4, 44]))

};
