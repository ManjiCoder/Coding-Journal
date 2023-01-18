import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Tooltip from "./Tooltip";

function CardItem({ title, setProgressBar, APIKEY, alertTodo }) {
  const [row, setRow] = useState([
    {
      ID: "53",
      Link: "https://practice.geeksforgeeks.org/problems/-regex-matching1145/1?page=5&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "RegEx matching",
      Status: "Done",
      Level: "2",
      Accuracy: "2",
      Time: "10m 55s",
      Code: "",
      Date: "1674029458523",
      Score: "560",
    },
    {
      ID: "52",
      Link: "https://practice.geeksforgeeks.org/problems/-regex-matching1145/1?page=5&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "RegEx matching",
      Status: "Wrong",
      Level: "0",
      Accuracy: "2",
      Time: "10m 55s",
      Code: "jlkjlkf",
      Date: "1674029179887",
      Score: "560",
    },
    {
      ID: "51",
      Link: "https://practice.geeksforgeeks.org/problems/special-array-reversal2328/1?page=3&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "Special array reversal",
      Status: "Done",
      Level: "2",
      Accuracy: "2",
      Time: " 11m 20s",
      Code: "arr = [] # to store special char\n        st = []  # to store s withour special char\n        for i,v in enumerate(s):\n            if(v.isalpha()):\n                st.append(v)\n            else:\n                arr.append(i)\n        st = st[::-1]\n        for v in arr:\n            st.insert(v,s[v])\n        return ('').join(st)",
      Date: "",
      Score: "738",
    },
    {
      ID: "50",
      Link: "https://practice.geeksforgeeks.org/problems/-regex-matching1145/1?page=5&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "RegEx matching",
      Status: "Done",
      Level: "2",
      Accuracy: "2",
      Time: "10m 55s",
      Code: "import re\n        if(re.search(P, S)):\n            return 1\n        return 0",
      Date: "",
      Score: "736",
    },
    {
      ID: "49",
      Link: "https://practice.geeksforgeeks.org/problems/confused-pappu5749/1?page=4&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "Confused pappu",
      Status: "Done",
      Level: "1",
      Accuracy: "1",
      Time: "4m 2s",
      Code: "# To Check Weather 0 exist in string\n        if('0' in str):\n            # Starting index of 0 in string\n            i = str.index('0');   \n            # Starting index of 0 in string\n            j = str.rindex('0')+1;    \n            # Negation of result\n            return (not '1' in str[i:j]);",
      Date: "",
      Score: "734",
    },
    {
      ID: "48",
      Link: "https://practice.geeksforgeeks.org/problems/the-muskteers3519/1?page=6&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "The Muskteers",
      Status: "Done",
      Level: "1",
      Accuracy: "4",
      Time: "3m 47s",
      Code: "# To Check Weather 0 exist in string\n        if('0' in str):\n            # Starting index of 0 in string\n            i = str.index('0');   \n            # Starting index of 0 in string\n            j = str.rindex('0')+1;    \n            # Negation of result\n            return (not '1' in str[i:j]);",
      Date: "",
      Score: "733",
    },
    {
      ID: "47",
      Link: "https://practice.geeksforgeeks.org/problems/remaining-string3515/1?page=2&difficulty",
      Title: "Remaining String",
      Status: "Done",
      Level: "2",
      Accuracy: "2",
      Time: "4m 45s",
      Code: "let reg = new RegExp(ch,\"g\")\n       let res = [...S.matchAll(reg)]\n       let n = S.length\n       let arr = []\n       if(res.length!=0){\n           res.map((v)=>{\n               arr.push(v.index)\n           })\n       }\n       if(count==0){\n           if(S.includes(ch)){\n               return S\n           }\n           else{\n               return 'Empty string'\n           }\n       }\n       let ans = (arr[count-1]==undefined) || (S.slice(arr[count-1]+1,n)=='')?\"Empty string\":S.slice(arr[count-1]+1,n)\n       return(ans)\n    }",
      Date: "",
      Score: "732",
    },
    {
      ID: "46",
      Link: "https://practice.geeksforgeeks.org/problems/string-reversalunpublished-for-now5324/1?page=4&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "String Reversal",
      Status: "Done",
      Level: "1",
      Accuracy: "2",
      Time: "4m 24s",
      Code: "st = ''\n        for v in s[::-1]:\n            if(not st.__contains__(v)):\n                st += v\n        ans = st.replace(' ','')\n        return ans\n",
      Date: "",
      Score: "730",
    },
    {
      ID: "45",
      Link: "https://practice.geeksforgeeks.org/problems/check-binary-string0402/1?page=15&category",
      Title: "Check Binary String",
      Status: "Done",
      Level: "1",
      Accuracy: "5",
      Time: "9m 17s",
      Code: "if(s.__contains__('1')):\n            i = s.index('1')\n            j = s.rindex('1')+1\n            return(not s[i:j].__contains__('0'))\n        return True\n",
      Date: "",
      Score: "729",
    },
    {
      ID: "44",
      Link: "https://practice.geeksforgeeks.org/problems/woodall-number2349/1?page=3&difficulty[]=0&status[]=unsolved&category[]=Mathematical&sortBy=accuracy",
      Title: "Woodall Number",
      Status: "Done",
      Level: "2",
      Accuracy: "2",
      Time: "10m 18s",
      Code: " Wn = 0         for i in range(1,N):             if(Wn<=N):                 Wn = i*pow(2,i)-1                 if(Wn==N):                     return 1         return 0",
      Date: "",
      Score: "727",
    },
    {
      ID: "43",
      Link: "https://practice.geeksforgeeks.org/problems/stuti-and-her-problem5846/1?page=4&status[]=bookmarked&sortBy=submissions",
      Title: "Natural Sum",
      Status: "Done",
      Level: "2",
      Accuracy: "5",
      Time: "6m 17s",
      Code: "int sum = 0;    \t    int ans = -1;    \t    if(n>1){    \t        for(int i=1; i<n; i++){    \t            sum += i;    \t            if(sum<=n){    \t                if(sum==n){    \t                    ans = i;    \t                    break;    \t                }    \t            }    \t        }    \t    }    \t    else{    \t        ans = n;    \t    }    \t    return ans;",
      Date: "",
      Score: "725",
    },
    {
      ID: "42",
      Link: "https://practice.geeksforgeeks.org/problems/part-of-it1016/1?page=2&status[]=unsolved&category[]=series&category[]=sieve&sortBy=submissions",
      Title: "Part of it",
      Status: "Done",
      Level: "4",
      Accuracy: "7",
      Time: "54m 41s",
      Code: 'int n1 = n+2;         for(int i=2; i<n1; i++){             if(n1%i==0){                 return "No";             }         }         return "Yes";',
      Date: "",
      Score: "723",
    },
    {
      ID: "41",
      Link: "https://practice.geeksforgeeks.org/problems/equal-to-product3836/1?page=16&difficulty[]=-1&difficulty[]=0&status[]=unsolved&category[]=Arrays&sortBy=accuracy",
      Title: "Product Pair",
      Status: "Done",
      Level: "2",
      Accuracy: "5",
      Time: "12m 24s",
      Code: "from collections import Counter\n        mp = Counter(arr)\n        for v in arr:\n            if v !=0:\n                j = x//v\n                if j in mp and j*v==x:\n                    return True\n                    break\n        return False",
      Date: "",
      Score: "719",
    },
    {
      ID: "40",
      Link: "https://practice.geeksforgeeks.org/problems/equal-to-product3836/1?page=1&status[]=bookmarked&sortBy=submissions",
      Title: "Product Pair",
      Status: "TLE",
      Level: "2",
      Accuracy: "-",
      Time: "7m 34s",
      Code: "for(let i=0; i<n; i++){             for (let j=i+1; j<n; j++){                 console.log(arr[i]%x==0)                 if(arr[i]*arr[j]==x) return true             }         }         return false",
      Date: "",
      Score: "-",
    },
    {
      ID: "39",
      Link: "https://practice.geeksforgeeks.org/problems/sum-of-two-numbers-represented-as-arrays3110/1?page=2&status[]=bookmarked&sortBy=submissions",
      Title: "Sum of two numbers represented as arrays",
      Status: "Done",
      Level: "2",
      Accuracy: "6",
      Time: "12m 43s",
      Code: "n1 = '' \t\tn2 = '' \t\tfor v in a: \t\t    n1 += str(v) \t\tfor v in b: \t\t    n2 += str(v) \t\tans = list(str(int(n1)+int(n2))) \t\treturn ans",
      Date: "",
      Score: "717",
    },
    {
      ID: "38",
      Link: "https://practice.geeksforgeeks.org/problems/sum-of-digits-in-factorial-of-a-number/1?page=1&category[]=factorial&sortBy=submissions",
      Title: "",
      Status: "",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "",
      Score: "",
    },
    {
      ID: "37",
      Link: "https://practice.geeksforgeeks.org/problems/strong-numbers3315/1?page=1&category[]=factorial&sortBy=submissions",
      Title: "",
      Status: "",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "",
      Score: "",
    },
    {
      ID: "36",
      Link: "https://practice.geeksforgeeks.org/problems/strong-numbers4336/1?page=1&category[]=factorial&sortBy=submissions",
      Title: "",
      Status: "",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "",
      Score: "",
    },
    {
      ID: "35",
      Link: "https://practice.geeksforgeeks.org/problems/first-and-last-bit2357/1?page=1&sortBy=submissions&searchQuery=last",
      Title: "First ans last bit",
      Status: "Done",
      Level: "1",
      Accuracy: "25%",
      Time: "14m 32s",
      Code: "binary = bin(n).replace('0b','')\n                if(binary.count('1')==2):\n                    return(1)\n                else:\n                    return(0)",
      Date: "25/12/22",
      Score: "466",
    },
    {
      ID: "34",
      Link: "https://practice.geeksforgeeks.org/problems/length-of-last-word5721/1",
      Title: "Length of Last word",
      Status: "Done",
      Level: "1",
      Accuracy: "7%, 14A",
      Time: "10m 28s",
      Code: "s = s.strip()\n        arr = s.split(' ')\n        ans = len(arr[len(arr)-1])\n        return(ans)",
      Date: "25/12/22",
      Score: "465",
    },
    {
      ID: "33",
      Link: "https://practice.geeksforgeeks.org/problems/snake-case0219/1",
      Title: "Snake Case",
      Status: "Done",
      Level: "2",
      Accuracy: "100%",
      Time: "0m 50s",
      Code: " S = S.lower()\r\n        S = S.replace(' ','_')\r\n        return(S)",
      Date: "25/12/22",
      Score: "464",
    },
    {
      ID: "32",
      Link: "https://practice.geeksforgeeks.org/problems/find-the-number-which-contain-the-digit-d4144/1?page=7&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "Find the Number which contain the digit d",
      Status: "Done",
      Level: "1",
      Accuracy: "20%",
      Time: "4m 59s",
      Code: "if(n>d):\n            d = str(d)\n            ans = []\n            for i in range(0,n+1):\n                i = str(i)\n                if(i.__contains__(d)):\n                    ans.append(i)\n            return(ans)\n        elif(n==d):\n            return([d])\n        else:\n            return([-1])",
      Date: "25/12/22",
      Score: "463",
    },
    {
      ID: "31",
      Link: "https://practice.geeksforgeeks.org/problems/amend-the-sentence3235/1?page=7&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "Amend The Sentence",
      Status: "Done",
      Level: "2",
      Accuracy: "100%",
      Time: "3m 8s",
      Code: "arr = list(s)\n        ans = ''\n        for v in arr:\n            if(v==v.upper()):\n                ans += \" \"+v.lower()\n            else:\n                ans += v\n        return(ans.strip())",
      Date: "25/12/22",
      Score: "462",
    },
    {
      ID: "30",
      Link: "https://practice.geeksforgeeks.org/problems/count-number-of-words1500/1?page=5&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Strings&sortBy=submissions",
      Title: "Count number of words",
      Status: "Done",
      Level: "2",
      Accuracy: "14%",
      Time: "12m 49s",
      Code: "s = s.replace('\\\\n',' ')\n        s = s.replace('\\\\t',' ')\n        s = s.split(' ')\n        return(len(s)-s.count(''))",
      Date: "25/12/22",
      Score: "460",
    },
    {
      ID: "29",
      Link: "https://practice.geeksforgeeks.org/problems/sort-a-stack/1?page=1&sortBy=submissions&searchQuery=stack",
      Title: "Sort a stack",
      Status: "Done",
      Level: "2",
      Accuracy: "25%",
      Time: "7m 14s",
      Code: "let arr = JSON.stringify(this.stack);\n    arr = JSON.parse(arr)\n    let rarr  = arr.sort((a,b)=>b-a)\n    let ans = (this.stack.toString()==rarr.toString())?this.stack:this.stack.sort((a,b)=>b-a)\n    return(ans)",
      Date: "24/12/22",
      Score: "458",
    },
    {
      ID: "28",
      Link: "https://practice.geeksforgeeks.org/problems/reverse-a-stack/1?page=1&sortBy=submissions&searchQuery=stack",
      Title: "Reverse a Stack",
      Status: "Done",
      Level: "4",
      Accuracy: "33%",
      Time: "22m 5s",
      Code: "arr = []\n        for i in range(len(st)-1,-1,-1):\n            arr.append(st[i])\n        return(arr)",
      Date: "24/12/22",
      Score: "456",
    },
    {
      ID: "27",
      Link: "https://practice.geeksforgeeks.org/problems/delete-middle-element-of-a-stack/1?page=1&sortBy=submissions&searchQuery=stack",
      Title: "Delete middle element of a stack",
      Status: "Done",
      Level: "2",
      Accuracy: "20%",
      Time: "16m 47s",
      Code: "let item = sizeOfStack-1%2==0?Math.round(sizeOfStack/2)+1:Math.round(sizeOfStack/2)-1\n    //   console.log(item)\n      s.a.splice(item,1)",
      Date: "24/12/22",
      Score: "452",
    },
    {
      ID: "26",
      Link: "https://practice.geeksforgeeks.org/problems/clone-a-stack-without-usinig-extra-space/1?page=1&sortBy=submissions&searchQuery=without",
      Title: "Clone a stack without using extra space",
      Status: "Done",
      Level: "4",
      Accuracy: "100%",
      Time: "1m 56s",
      Code: "st.map((v)=>{\n          cloned.push(v)\n      })",
      Date: "24/12/22",
      Score: "450",
    },
    {
      ID: "25",
      Link: "https://practice.geeksforgeeks.org/problems/sum-of-two-numbers-without-using-arithmetic-operators/1",
      Title: "Sum of two numbers without using arithmetic operators",
      Status: "Done",
      Level: "2",
      Accuracy: "20%",
      Time: "38m 35s",
      Code: "ans = 0;\n    while (b != 0):\n        carry = a & b;\n        a = a ^ b;\n        b = carry<<1;\n    return (a)\n",
      Date: "24/12/22",
      Score: "",
    },
    {
      ID: "24",
      Link: "https://practice.geeksforgeeks.org/problems/addition-of-submatrix5835/1?page=3&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Arrays&category[]=Strings&sortBy=accuracy",
      Title: "Addition of submatrix",
      Status: "Done",
      Level: "2",
      Accuracy: "100%",
      Time: "7m 48s",
      Code: "#print(x1,x2,y1,y2)\r\n\t\tsum = 0;\r\n\t\tfor i in range(x1-1,x2):\r\n\t\t    #print(arr[i])\r\n\t\t    for j in range(y1-1,y2):\r\n\t\t        sum+=(arr[i][j])\r\n\t\treturn (sum)",
      Date: "24/12/22",
      Score: "",
    },
    {
      ID: "23",
      Link: "https://practice.geeksforgeeks.org/problems/find-first-set-bit-1587115620/0",
      Title: "Find first set bit",
      Status: "Done",
      Level: "2",
      Accuracy: "50%",
      Time: "2m 55s",
      Code: "let binary = n.toString(2).split('').reverse().join('')\n        return (binary.indexOf('1')+1)",
      Date: "23/12/22",
      Score: "",
    },
    {
      ID: "22",
      Link: "https://practice.geeksforgeeks.org/problems/queries-on-strings5636/0",
      Title: "Queries on Strings",
      Status: "Done",
      Level: "4",
      Accuracy: "100%",
      Time: "6m 19s",
      Code: "S = str;\r\n\t    ans = []\r\n\t    for i in range(0,len(Query)):\r\n\t\t    sets = set(S[Query[i][0]-1:Query[i][1]])\r\n\t\t    ans.append(len(sets))\r\n\t\treturn (ans)",
      Date: "23/12/2022",
      Score: "",
    },
    {
      ID: "21",
      Link: "https://practice.geeksforgeeks.org/problems/remove-leading-zeros-from-an-ip-address3530/0",
      Title: "Remove leading zeros from an IP address",
      Status: "Done",
      Level: "4",
      Accuracy: "100%",
      Time: "5m 12s",
      Code: "S = S.split('.')\n        ans = ''\n        for v in S:\n            ans+=str(int(v))+'.'\n        ans = ans[0:len(ans)-1]\n        return(ans)\n",
      Date: "23/12/22",
      Score: "",
    },
    {
      ID: "20",
      Link: "https://practice.geeksforgeeks.org/problems/find-the-remainder1439/1?page=16&category[]=Mathematical&sortBy=submissions",
      Title: "Find the remainder",
      Status: "Done ",
      Level: "1",
      Accuracy: "100%",
      Time: "53s",
      Code: "ans = int(N)%7;\r\n        return (ans)\r\n",
      Date: "23/12/22",
      Score: "",
    },
    {
      ID: "19",
      Link: "https://practice.geeksforgeeks.org/problems/toggle-bits-given-range0952/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=bits",
      Title: "Toggle bits given range",
      Status: "Done",
      Level: "1",
      Accuracy: "50%",
      Time: "4m 1s",
      Code: "let binary = N.toString(2).split('').reverse()\n       for(let i=L-1; i<R; i++){\n           binary[i] =(binary[i]=='0')?'1':'0'\n       }\n       binary = binary.reverse()\n       return(parseInt(binary.join(''),2))",
      Date: "23/12/22",
      Score: "",
    },
    {
      ID: "18",
      Link: "https://practice.geeksforgeeks.org/problems/set-all-odd-bits1900/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=bits",
      Title: "Set all odd bits",
      Status: "Done",
      Level: "1",
      Accuracy: "50%",
      Time: "10m 47s",
      Code: "binary = bin(n).replace('0b','')[::-1]\n        binary = list(binary)\n        for i in range(0,len(binary)):\n            if(i%2==0):\n                if(binary[i]=='0'):\n                    binary[i]='1'\n        ans = ''.join(binary[::-1])\n        return(int(ans,2))",
      Date: "23/12/22",
      Score: "",
    },
    {
      ID: "17",
      Link: "https://practice.geeksforgeeks.org/problems/change-all-even-bits-in-a-number-to-03253/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=bits",
      Title: "Change all even bits in a number to 0",
      Status: "Done",
      Level: "1",
      Accuracy: "",
      Time: "9m 21s",
      Code: "let binary = n.toString(2).split('').reverse()\n        for(let i=0; i<binary.length; i=i+2){\n            if(binary[i]='1') binary[i]='0'\n        }\n        binary.reverse()\n        return(parseInt(binary.join(''),2))",
      Date: "23/12/22",
      Score: "",
    },
    {
      ID: "16",
      Link: "https://practice.geeksforgeeks.org/problems/remainder-of-array-multiplication0140/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=remainder",
      Title: "Remainder of array multiplication",
      Status: "TimeOut:139 /201",
      Level: "2",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "23/12/22",
      Score: "",
    },
    {
      ID: "15",
      Link: "https://practice.geeksforgeeks.org/problems/set-all-the-bits-in-given-range-of-a-number4538/1?page=1&sortBy=submissions&searchQuery=Bits",
      Title: "Set all the bits in given range of a number",
      Status: "Done",
      Level: "2",
      Accuracy: "",
      Time: "14m 2s",
      Code: "binary = bin(N).replace('0b','')[::-1]\n        arr = list(binary)\n        for i in range(L-1,R):\n            arr[i]='1'\n        ans = ''.join(arr)[::-1]\n        return (int(ans,2))",
      Date: "22/12/22",
      Score: "",
    },
    {
      ID: "14",
      Link: "https://practice.geeksforgeeks.org/problems/count-unset-bits-in-a-given-range1216/1?page=2&sortBy=submissions&searchQuery=Bits",
      Title: "Count unset bits in a given Range",
      Status: "Done",
      Level: "2",
      Accuracy: "",
      Time: "3m 12s",
      Code: "binary = bin(n).replace('0b','')[::-1]\r\n        ans = binary[l-1:r].count('0')\r\n        return (ans)",
      Date: "22/12/22",
      Score: "",
    },
    {
      ID: "13",
      Link: "https://practice.geeksforgeeks.org/problems/reverse-bits3556/1?page=4&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Mathematical&sortBy=accuracy",
      Title: "Reverse Bits",
      Status: "Done",
      Level: "2",
      Accuracy: "",
      Time: "1m 39s",
      Code: "binary = bin(X).replace('0b','').zfill(32)\n        ans = int(binary[::-1],2)\n        return (ans)",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "12",
      Link: "https://practice.geeksforgeeks.org/problems/count-numbers-divisible-by-m1524/1?page=3&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Mathematical&sortBy=accuracy",
      Title: "Count numbers divisible by M",
      Status: "143 /203",
      Level: "1",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "11",
      Link: "https://practice.geeksforgeeks.org/problems/sherlock-and-his-enemies2304/1",
      Title: "Count Total Setbits",
      Status: "TimeOut",
      Level: "4",
      Accuracy: "",
      Time: "",
      Code: "ans = 0;\n        for i in range(1,N+1):\n            i = bin(i).replace('0b','')\n            if(i.count('1')>0):\n                ans += i.count('1')\n        return(ans)",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "10",
      Link: "https://practice.geeksforgeeks.org/problems/check-set-bits5408/1?page=1&status[]=unsolved&sortBy=accuracy&searchQuery=bits",
      Title: "Check set bits",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "2m27s",
      Code: "let setBits = N.toString(2)\n        let ans = setBits.includes('0')?0:1\n        return(ans)",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "9",
      Link: "https://practice.geeksforgeeks.org/problems/got-tv-series3124/1?page=1&status[]=unsolved&sortBy=accuracy&searchQuery=bits",
      Title: "set-bits and numbe",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "2m7s",
      Code: "binary = bin(N).replace('0b','')\n        setBits = binary.count('1')\n        return(N*setBits)",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "8",
      Link: "https://practice.geeksforgeeks.org/problems/reverse-bits-1611130171/1?page=1&sortBy=submissions&searchQuery=Bits",
      Title: "Reverse Bits",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "2m8s",
      Code: "N = N.toString(2)\n        let R = N.split('').reverse().join('')\n        return(parseInt(R,2))",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "7",
      Link: "https://practice.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1?page=1&sortBy=submissions&searchQuery=Bits",
      Title: "",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "6",
      Link: "https://practice.geeksforgeeks.org/problems/set-bits0143/1?page=1&sortBy=submissions&searchQuery=Bits",
      Title: "Number of 1 Bits",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "2m9s",
      Code: "let s = n.toString(2)\n        let reg = /1/g;\n        let res = [...s.matchAll(reg)]\n        return (res.length)",
      Date: "27/12/2022",
      Score: "",
    },
    {
      ID: "5",
      Link: "https://practice.geeksforgeeks.org/problems/parity-of-unsigned-integer4247/1?page=13&category[]=Mathematical&sortBy=submissions",
      Title: "Parity of unsigned integer",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "let S = N.toString(2)\r\n        let reg = new RegExp('1','g')\r\n        let ans = [...S.matchAll(reg)]\r\n        ans = ans.length%2==0?\"even\":\"odd\"\r\n        return (ans)",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "4",
      Link: "https://practice.geeksforgeeks.org/problems/nth-character-in-concatenated-decimal-string0245/1?page=1&sortBy=submissions&searchQuery=decimal",
      Title: "",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "3",
      Link: "https://practice.geeksforgeeks.org/problems/check-if-a-integer-is-power-of-8-or-not2537/1?page=1&sortBy=submissions&searchQuery=power",
      Title: "",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "2",
      Link: "https://practice.geeksforgeeks.org/problems/check-a-integer-is-power-of-3-or-not3850/1?page=1&sortBy=submissions&searchQuery=power",
      Title: "",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "",
      Date: "22/12/2022",
      Score: "",
    },
    {
      ID: "1",
      Link: "https://practice.geeksforgeeks.org/problems/power-of-2-1587115620/1?page=1&sortBy=submissions&searchQuery=power",
      Title: "",
      Status: "Done",
      Level: "",
      Accuracy: "",
      Time: "",
      Code: "let c = Math.round(Math.log(n)/Math.log(2))\n        if(c==-Infinity || c==Infinity) return(false)\n        if(n==Math.pow(2,c)) return(true)\n        else return(false)",
      Date: "22/12/2022",
      Score: "",
    },
  ]);
  const [spinner, setSpinner] = useState(true);
  // const [status, setStatus] = useState(false)
  const getRow = async () => {
    // let url = `https://sheetdb.io/api/v1/${APIKEY}?sort_by=ID&sort_order=desc`;
    // console.log(url);
    // let url = `https://script.google.com/macros/s/AKfycbyzpvcL3QKvS0wD8LntnI4vBAtSl46KMCgAqK3tVVjK8LKBqLD5SVyssvx_7l1D4327/exec`;
    setProgressBar(30);
    // let res = await fetch(url);
    setProgressBar(60);
    // if (res.ok) {
    //   let response = await res.json();
    //   // response.data.shift();
    //   console.log(response);
    //   setProgressBar(90);
    //   setSpinner(false);
    //   setRow(row.concat(response));
    //   setProgressBar(100);
    // } else {
    //   throw Error(res.message);
    // }
  };

  const deleteRow = (id) => {
    console.log(id, APIKEY);
    fetch(`https://sheetdb.io/api/v1/${APIKEY}/ID/${id}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const editRow = (id) => {
    console.log(id);
    alertTodo("Edited",'green');
  };
  useEffect(() => {
    getRow();
    return () => {
      console.log("Component logged out...");
    };
    // eslint-disable-next-line
  }, []);
  // row.shift(); // for dev only

  return (
    <>
      <div className="pb-7 dark:bg-gray-900">
        <p className="text-3xl mb-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {title}
        </p>

        {/* Spinner */}
        {/* <Spinner/> */}
        {spinner && <Spinner />}
        {/* cards */}
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {row.map((element, i) => {
            // console.log(row);
            return (
              <div
                key={element.ID}
                className="w-96 sm:w-96 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-100"
              >
                <div className="flex mb-4">
                  <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                    alt="Greeks For Greek"
                  />
                  <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {"-"}&nbsp;&nbsp;{element.ID.toString().padStart(2, 0)}
                  </span>
                </div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  <blockquote>{element.Title}</blockquote>
                </h5>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Status -{" "}
                  <span
                    className={`${
                      element.Status === "Done"
                        ? "text-green-500"
                        : "text-red-600"
                    } font-bold`}
                  >
                    {element.Status}
                  </span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Level - <span className={`font-bold`}>{element.Level}</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Accuracy -{" "}
                  <span className={`font-bold`}>{element.Accuracy}%</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Time - <span className={`font-bold`}>{element.Time}</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Code -{" "}
                  <span className={`font-bold`}>
                    <a href="/" className="text-blue-600 cursor-pointer">
                      View
                    </a>
                  </span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Date - <span className={`font-bold`}>{element.Date}</span>
                </p>
                <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                  Score -{" "}
                  <span className={`font-bold text-red-700`}>
                    {element.Score}
                  </span>
                </p>
                <a
                  href={element.Link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read More
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                </a>
                {/* Icons */}
                <section className="flex justify-between py-7">
                  <i
                    data-tooltip-target="tooltip-animation-Edit"
                    data-tooltip-placement="bottom"
                    className="text-blue-700 hover:text-blue-500  text-3xl fa-solid fa-pen-to-square cursor-pointer"
                    onClick={() => {
                      editRow(element.ID);
                    }}
                  ></i>

                  <Tooltip text="Edit" />
                  <i
                    data-tooltip-target="tooltip-animation-Delete"
                    data-tooltip-placement="bottom"
                    className="text-red-700 hover:text-red-500 text-3xl fa-solid fa-eraser cursor-pointer"
                    onClick={() => {
                      deleteRow(element.ID);
                    }}
                  ></i>
                  <Tooltip text="Delete" />
                </section>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default CardItem;
