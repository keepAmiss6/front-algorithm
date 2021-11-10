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

    const resVal=validParallelStr('deoued');
    console.log(resVal);
}
