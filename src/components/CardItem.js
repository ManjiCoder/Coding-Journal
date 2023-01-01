import React, { useEffect, useState } from "react";

function CardItem({ title, setProgressBar }) {
  const [row, setRow] = useState([
    {
      link: "Link",
      title: "Title",
      status: "Status",
      level: "Level",
      accuracy: "Accuracy",
      time: "Time",
      code: "Code",
      date: "Date",
      score: "Score",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/power-of-2-1587115620/1?page=1&sortBy=submissions&searchQuery=power",
      title: "",
      status: "Done",
      level: "",
      accuracy: "",
      time: "",
      code: "let c = Math.round(Math.log(n)/Math.log(2))\n        if(c==-Infinity || c==Infinity) return(false)\n        if(n==Math.pow(2,c)) return(true)\n        else return(false)",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/check-a-integer-is-power-of-3-or-not3850/1?page=1&sortBy=submissions&searchQuery=power",
      title: "",
      status: "Done",
      level: "",
      accuracy: "",
      time: "",
      code: "",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/check-if-a-integer-is-power-of-8-or-not2537/1?page=1&sortBy=submissions&searchQuery=power",
      title: "",
      status: "Done",
      level: "",
      accuracy: "",
      time: "",
      code: "",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/nth-character-in-concatenated-decimal-string0245/1?page=1&sortBy=submissions&searchQuery=decimal",
      title: "",
      status: "Done",
      level: "",
      accuracy: "",
      time: "",
      code: "",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/parity-of-unsigned-integer4247/1?page=13&category[]=Mathematical&sortBy=submissions",
      title: "Parity of unsigned integer",
      status: "Done",
      level: "",
      accuracy: "",
      time: "",
      code: "let S = N.toString(2)\r\n        let reg = new RegExp('1','g')\r\n        let ans = [...S.matchAll(reg)]\r\n        ans = ans.length%2==0?\"even\":\"odd\"\r\n        return (ans)",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/set-bits0143/1?page=1&sortBy=submissions&searchQuery=Bits",
      title: "Number of 1 Bits",
      status: "Done",
      level: "",
      accuracy: "",
      time: "2m9s",
      code: "let s = n.toString(2)\n        let reg = /1/g;\n        let res = [...s.matchAll(reg)]\n        return (res.length)",
      date: "2022-12-26T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1?page=1&sortBy=submissions&searchQuery=Bits",
      title: "",
      status: "Done",
      level: "",
      accuracy: "",
      time: "",
      code: "",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/reverse-bits-1611130171/1?page=1&sortBy=submissions&searchQuery=Bits",
      title: "Reverse Bits",
      status: "Done",
      level: "",
      accuracy: "",
      time: "2m8s",
      code: "N = N.toString(2)\n        let R = N.split('').reverse().join('')\n        return(parseInt(R,2))",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/got-tv-series3124/1?page=1&status[]=unsolved&sortBy=accuracy&searchQuery=bits",
      title: "set-bits and numbe",
      status: "Done",
      level: "",
      accuracy: "",
      time: "2m7s",
      code: "binary = bin(N).replace('0b','')\n        setBits = binary.count('1')\n        return(N*setBits)",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/check-set-bits5408/1?page=1&status[]=unsolved&sortBy=accuracy&searchQuery=bits",
      title: "Check set bits",
      status: "Done",
      level: "",
      accuracy: "",
      time: "2m27s",
      code: "let setBits = N.toString(2)\n        let ans = setBits.includes('0')?0:1\n        return(ans)",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/sherlock-and-his-enemies2304/1",
      title: "Count Total Setbits",
      status: "TimeOut",
      level: 4,
      accuracy: "",
      time: "",
      code: "ans = 0;\n        for i in range(1,N+1):\n            i = bin(i).replace('0b','')\n            if(i.count('1')>0):\n                ans += i.count('1')\n        return(ans)",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/count-numbers-divisible-by-m1524/1?page=3&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Mathematical&sortBy=accuracy",
      title: "Count numbers divisible by M",
      status: "143 /203",
      level: 1,
      accuracy: "",
      time: "",
      code: "",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/reverse-bits3556/1?page=4&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Mathematical&sortBy=accuracy",
      title: "Reverse Bits",
      status: "Done",
      level: 2,
      accuracy: "",
      time: "1m 39s",
      code: "binary = bin(X).replace('0b','').zfill(32)\n        ans = int(binary[::-1],2)\n        return (ans)",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/count-unset-bits-in-a-given-range1216/1?page=2&sortBy=submissions&searchQuery=Bits",
      title: "Count unset bits in a given Range",
      status: "Done",
      level: 2,
      accuracy: "",
      time: "3m 12s",
      code: "binary = bin(n).replace('0b','')[::-1]\r\n        ans = binary[l-1:r].count('0')\r\n        return (ans)",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/set-all-the-bits-in-given-range-of-a-number4538/1?page=1&sortBy=submissions&searchQuery=Bits",
      title: "Set all the bits in given range of a number",
      status: "Done",
      level: 2,
      accuracy: "",
      time: "14m 2s",
      code: "binary = bin(N).replace('0b','')[::-1]\n        arr = list(binary)\n        for i in range(L-1,R):\n            arr[i]='1'\n        ans = ''.join(arr)[::-1]\n        return (int(ans,2))",
      date: "2022-12-21T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/remainder-of-array-multiplication0140/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=remainder",
      title: "Remainder of array multiplication",
      status: "TimeOut:139 /201",
      level: 2,
      accuracy: "",
      time: "",
      code: "",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/change-all-even-bits-in-a-number-to-03253/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=bits",
      title: "Change all even bits in a number to 0",
      status: "Done",
      level: 1,
      accuracy: "",
      time: "9m 21s",
      code: "let binary = n.toString(2).split('').reverse()\n        for(let i=0; i<binary.length; i=i+2){\n            if(binary[i]='1') binary[i]='0'\n        }\n        binary.reverse()\n        return(parseInt(binary.join(''),2))",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/set-all-odd-bits1900/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=bits",
      title: "Set all odd bits",
      status: "Done",
      level: 1,
      accuracy: 0.5,
      time: "10m 47s",
      code: "binary = bin(n).replace('0b','')[::-1]\n        binary = list(binary)\n        for i in range(0,len(binary)):\n            if(i%2==0):\n                if(binary[i]=='0'):\n                    binary[i]='1'\n        ans = ''.join(binary[::-1])\n        return(int(ans,2))",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/toggle-bits-given-range0952/1?page=1&status[]=unsolved&sortBy=submissions&searchQuery=bits",
      title: "Toggle bits given range",
      status: "Done",
      level: 1,
      accuracy: 0.5,
      time: "4m 1s",
      code: "let binary = N.toString(2).split('').reverse()\n       for(let i=L-1; i<R; i++){\n           binary[i] =(binary[i]=='0')?'1':'0'\n       }\n       binary = binary.reverse()\n       return(parseInt(binary.join(''),2))",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/find-the-remainder1439/1?page=16&category[]=Mathematical&sortBy=submissions",
      title: "Find the remainder",
      status: "Done ",
      level: 1,
      accuracy: 1,
      time: "53s",
      code: "ans = int(N)%7;\r\n        return (ans)\r\n",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/remove-leading-zeros-from-an-ip-address3530/0",
      title: "Remove leading zeros from an IP address",
      status: "Done",
      level: 4,
      accuracy: 1,
      time: "5m 12s",
      code: "S = S.split('.')\n        ans = ''\n        for v in S:\n            ans+=str(int(v))+'.'\n        ans = ans[0:len(ans)-1]\n        return(ans)\n",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/queries-on-strings5636/0",
      title: "Queries on Strings",
      status: "Done",
      level: 4,
      accuracy: 1,
      time: "6m 19s",
      code: "S = str;\r\n\t    ans = []\r\n\t    for i in range(0,len(Query)):\r\n\t\t    sets = set(S[Query[i][0]-1:Query[i][1]])\r\n\t\t    ans.append(len(sets))\r\n\t\treturn (ans)",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/find-first-set-bit-1587115620/0",
      title: "Find first set bit",
      status: "Done",
      level: 2,
      accuracy: 0.5,
      time: "2m 55s",
      code: "let binary = n.toString(2).split('').reverse().join('')\n        return (binary.indexOf('1')+1)",
      date: "2022-12-22T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/addition-of-submatrix5835/1?page=3&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Arrays&category[]=Strings&sortBy=accuracy",
      title: "Addition of submatrix",
      status: "Done",
      level: 2,
      accuracy: 1,
      time: "7m 48s",
      code: "#print(x1,x2,y1,y2)\r\n\t\tsum = 0;\r\n\t\tfor i in range(x1-1,x2):\r\n\t\t    #print(arr[i])\r\n\t\t    for j in range(y1-1,y2):\r\n\t\t        sum+=(arr[i][j])\r\n\t\treturn (sum)",
      date: "2022-12-23T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/sum-of-two-numbers-without-using-arithmetic-operators/1",
      title: "Sum of two numbers without using arithmetic operators",
      status: "Done",
      level: 2,
      accuracy: 0.2,
      time: "38m 35s",
      code: "ans = 0;\n    while (b != 0):\n        carry = a & b;\n        a = a ^ b;\n        b = carry<<1;\n    return (a)\n",
      date: "2022-12-23T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/clone-a-stack-without-usinig-extra-space/1?page=1&sortBy=submissions&searchQuery=without",
      title: "Clone a stack without using extra space",
      status: "Done",
      level: 4,
      accuracy: 1,
      time: "1m 56s",
      code: "st.map((v)=>{\n          cloned.push(v)\n      })",
      date: "2022-12-23T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/delete-middle-element-of-a-stack/1?page=1&sortBy=submissions&searchQuery=stack",
      title: "Delete middle element of a stack",
      status: "Done",
      level: 2,
      accuracy: 0.2,
      time: "16m 47s",
      code: "let item = sizeOfStack-1%2==0?Math.round(sizeOfStack/2)+1:Math.round(sizeOfStack/2)-1\n    //   console.log(item)\n      s.a.splice(item,1)",
      date: "2022-12-23T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/reverse-a-stack/1?page=1&sortBy=submissions&searchQuery=stack",
      title: "Reverse a Stack",
      status: "Done",
      level: 4,
      accuracy: 0.33,
      time: "22m 5s",
      code: "arr = []\n        for i in range(len(st)-1,-1,-1):\n            arr.append(st[i])\n        return(arr)",
      date: "2022-12-23T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/sort-a-stack/1?page=1&sortBy=submissions&searchQuery=stack",
      title: "Sort a stack",
      status: "Done",
      level: 2,
      accuracy: 0.25,
      time: "7m 14s",
      code: "let arr = JSON.stringify(this.stack);\n    arr = JSON.parse(arr)\n    let rarr  = arr.sort((a,b)=>b-a)\n    let ans = (this.stack.toString()==rarr.toString())?this.stack:this.stack.sort((a,b)=>b-a)\n    return(ans)",
      date: "2022-12-23T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/count-number-of-words1500/1?page=5&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Strings&sortBy=submissions",
      title: "Count number of words",
      status: "Done",
      level: 2,
      accuracy: 0.14,
      time: "12m 49s",
      code: "s = s.replace('\\\\n',' ')\n        s = s.replace('\\\\t',' ')\n        s = s.split(' ')\n        return(len(s)-s.count(''))",
      date: "2022-12-24T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/amend-the-sentence3235/1?page=7&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Strings&sortBy=submissions",
      title: "Amend The Sentence",
      status: "Done",
      level: 2,
      accuracy: 1,
      time: "3m 8s",
      code: "arr = list(s)\n        ans = ''\n        for v in arr:\n            if(v==v.upper()):\n                ans += \" \"+v.lower()\n            else:\n                ans += v\n        return(ans.strip())",
      date: "2022-12-24T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/find-the-number-which-contain-the-digit-d4144/1?page=7&difficulty[]=-1&difficulty[]=0&difficulty[]=1&status[]=unsolved&category[]=Strings&sortBy=submissions",
      title: "Find the Number which contain the digit d",
      status: "Done",
      level: 1,
      accuracy: 0.2,
      time: "4m 59s",
      code: "if(n>d):\n            d = str(d)\n            ans = []\n            for i in range(0,n+1):\n                i = str(i)\n                if(i.__contains__(d)):\n                    ans.append(i)\n            return(ans)\n        elif(n==d):\n            return([d])\n        else:\n            return([-1])",
      date: "2022-12-24T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/snake-case0219/1",
      title: "Snake Case",
      status: "Done",
      level: 2,
      accuracy: 1,
      time: "0m 50s",
      code: " S = S.lower()\r\n        S = S.replace(' ','_')\r\n        return(S)",
      date: "2022-12-24T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/length-of-last-word5721/1",
      title: "Length of Last word",
      status: "Done",
      level: 1,
      accuracy: "7%, 14A",
      time: "10m 28s",
      code: "s = s.strip()\n        arr = s.split(' ')\n        ans = len(arr[len(arr)-1])\n        return(ans)",
      date: "2022-12-24T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/first-and-last-bit2357/1?page=1&sortBy=submissions&searchQuery=last",
      title: "First ans last bit",
      status: "Done",
      level: 1,
      accuracy: 0.25,
      time: "14m 32s",
      code: "binary = bin(n).replace('0b','')\n                if(binary.count('1')==2):\n                    return(1)\n                else:\n                    return(0)",
      date: "2022-12-24T18:30:00.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/strong-numbers4336/1?page=1&category[]=factorial&sortBy=submissions",
      title: "",
      status: "",
      level: "",
      accuracy: "",
      time: "",
      code: "",
      date: "",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/strong-numbers3315/1?page=1&category[]=factorial&sortBy=submissions",
      title: "",
      status: "",
      level: "",
      accuracy: "",
      time: "",
      code: "",
      date: "",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/sum-of-digits-in-factorial-of-a-number/1?page=1&category[]=factorial&sortBy=submissions",
      title: "",
      status: "",
      level: "",
      accuracy: "",
      time: "",
      code: "",
      date: "",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/product-sum3012/1?page=1&category[]=Numbers&sortBy=submissions",
      title: "Product Sum",
      status: "Done",
      level: 1,
      accuracy: 50,
      time: "3m 7s",
      code: "ans = (a*b)\nans = str(abs(ans))\nreturn(len(ans))",
      date: "2022-12-26T10:40:23.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/triangle-pattern-1661718013/1?page=2&sortBy=submissions&searchQuery=pattern",
      title: "Pattern-10",
      status: "Done",
      level: 1,
      accuracy: 25,
      time: "3m 13s",
      code: "if(N==1):\nprint('*)\nelse:\nfor i in range(1,N+1):\nprint('* '*i)\nfor j in range(N-1,0,-1):\nprint('* '*j)",
      date: "2022-12-26T13:18:05.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/triangle-number-1661489840/1?page=2&sortBy=submissions&searchQuery=pattern",
      title: "Pattern 6",
      status: "Done",
      level: 2,
      accuracy: 100,
      time: "4m 7s",
      code: "arr = [] for i in range(1,N+1): arr.append(str(i)) for j in range(len(arr),0,-1): p = (' ').join(arr[0:j]) print(p)",
      date: "2022-12-26T13:29:25.000Z",
      score: "",
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/triangle-number/1?page=2&sortBy=submissions&searchQuery=pattern",
      title: "Pattern 3",
      status: "Done",
      level: 2,
      accuracy: 100,
      time: "1m 0s",
      code: "arr = [] for i in range(1,N+1): arr.append(str(i)) for j in range(1,len(arr)+1): p = (' ').join(arr[0:j]) print(p)",
      date: "2022-12-26T13:31:02.000Z",
      score: 385,
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/logical-operators/1?page=1&category[]=cpp-operator&sortBy=submissions",
      title: "Logical Operators",
      status: "Done",
      level: 1,
      accuracy: 100,
      time: "5m 50s",
      code: "let ans = ''\nans += (Number(a>0 && b>0))+' '\nans += (Number(a>0 || b>0))+' '\nans += (Number(!a && !b))\nreturn(ans)",
      date: "2022-12-26T20:02:55.000Z",
      score: 386,
    },
    {
      link: "https://practice.geeksforgeeks.org/problems/playing-with-mobile-numbers0732/1?page=1&category[]=Sqrt%20Decomposition&category[]=Quantifiers&sortBy=submissions",
      title: "Playing with mobile numbers",
      status: "Done",
      level: 2,
      accuracy: 50,
      time: "12m 30s",
      code: "n = len(s)\n        ans = 0;\n        if(n==10):\n            if(s[0]=='7'): ans = 1;\n            elif(s[0]=='8'): ans = 1;\n            elif(s[0]=='9'): ans = 1;\n        elif(n==11):\n            if(s[0]=='0'):\n                if(s[1]=='7'): ans = 1;\n                elif(s[1]=='8'): ans = 1;\n                elif(s[1]=='9'): ans = 1;\n        elif(n==12):\n            if(s[0:2]=='91'):\n                if(s[2]=='7'): ans = 1;\n                elif(s[2]=='8'): ans = 1;\n                elif(s[2]=='9'): ans = 1;\n        return(ans)",
      date: "2022-12-27T12:21:27.000Z",
      score: 388,
    },
  ]);

  const getRow = async () => {
    let url = `https://script.google.com/macros/s/AKfycbyH3ItxKNTqbwMRHW3xPT51vVUqomTL1Rq4unEKdaChLTFrwEFsAGtR9NDSnmlOLikm/exec`;
    setProgressBar(30);
    let res = await fetch(url);
    setProgressBar(60);
    if (res.ok) {
      let response = await res.json();
      console.log(response);
      setProgressBar(90);
      setRow(row.concat(response.data));
      row.shift();
      setProgressBar(100);
    } else {
      throw Error(res.message);
    }
  };

  useEffect(() => {
    // getRow();
    return () => {
      console.log("Component logged out...");
    };
    // eslint-disable-next-line
  }, []);
  row.shift(); // for dev only

  return (
    <div className="overflow-x-auto relative">
      <p className="text-3xl mb-4 font-bold text-center text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {title}
      </p>

      {/* cards */}
      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {row.map((element, i) => {
          console.log(row);
          return (
            <div
              key={element.link}
              className="w-96 sm:w-96 mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex mb-4">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20200716222246/Path-219.png"
                  alt="Greeks For Greek"
                />
                <span className="ml-4 mb-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {"-"}&nbsp;&nbsp;{(i + 1).toString().padStart(2, 0)}
                </span>
              </div>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <blockquote>{element.title}</blockquote>
              </h5>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Status -{" "}
                <span
                  className={`${
                    element.status === "Done"
                      ? "text-green-500"
                      : "text-red-600"
                  } font-bold`}
                >
                  {element.status}
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Level - <span className={`font-bold`}>{element.level}</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Accuracy -{" "}
                <span className={`font-bold`}>{element.accuracy}%</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Time - <span className={`font-bold`}>{element.time}</span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Code -{" "}
                <span className={`font-bold`}>
                  <a href="#" className="text-blue-600 cursor-pointer">
                    View
                  </a>
                </span>
              </p>
              <p className="mb-3 font-normal text-gray-600 dark:text-gray-400">
                Date - <span className={`font-bold`}>{element.date}</span>
              </p>
              <a
                href={element.link}
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
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default CardItem;
