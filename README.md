### 一个 redux 练习demo 01
简单构造了redux store 文件

### demo 完成后的感受  关于 VUEX 与 REDUX 对比


*仅从设计理念、使用角度进行对比，不涉及实现原理。*

尤大也说过VUEX是吸收了Redux的经验，放弃了一些特性并做了一些优化，代价就是VUEX只能和VUE配合。

而Redux则是一个纯粹的状态管理系统，React利用React-Redux将它与React框架结合起来。

VUEX与React-Redux：一个是针对VUE优化的状态管理系统，一个仅是常规的状态管理系统（Redux）与React框架的结合版本。它们必然在都具备常规的状态管理的功能之外，针对性地对各自所对应的框架还会有一些更优的特性，并且React-Redux还有一些衍生项目。DVA就是一个基于对React-Redux进行封装并提供了一些优化特性的框架，所以下文也会结合DVA进行对比。

#### 设计理念：
虽然很多文章都提到说不要为了用状态管理而用状态管理，但是状态管理对于前端单页应用的管理思想还是很精髓的：
- Web应用是一个状态机，视图与状态是一一对应的。

![image](https://vuex.vuejs.org/flow.png)

我认为，一旦认同这种模式并在项目组使用了状态管理，就要严格的在整个应用中都采用这种模式。因此，基于这种特性，我们需要一种机制或者框架：使得我们能够管理状态，感知变化，并将状态映射为页面表现。

**Redux**，本身就是一个单纯的状态管理者，我们不追溯它的历史，从使用角度来说：它提供一个全局的对象store，store中包含state对象用以包含所有应用数据，并且store提供了一些reducer方法。这些方法可以自定义，使用调用者得以改变state的值。state的值仅为只读，如果需要更改则必须只能通过reducer。

有了状态保存，有了读写机制，Redux这一套状态管理的框架对于web应用的状态机管理的思想就是可用的。

**React-Redux**，简单来说，它提供了一些接口，用于Redux的状态和React的组件展示结合起来，以用于实现状态与视图的一一对应。

**VUEX**，吸收了Redux的思想，并且针对web应用的开发模式和VUE框架做了优化。所以它在实现了全量Redux的思想以外，为了与VUE框架结合，它也具备了类似React-Redux中的与框架结合的功能（尽管具体使用方式可能有差异），此外还一些更好用的特性，下文会说到。

**DVA**，则是对React-Redux进行了封装，并结合了Redux-Saga等中间件，而且使用了model概念，也相当于在React-Redux的基础上针对web应用开发做了优化。（个人认为DVA框架的开发者可能是对VUEX有所借鉴的）

所以说，看起来VUE家族的一个VUEX，就可以匹敌React家族的这些封装封装再封装……

###### VUEX数据流向图


![image](https://vuex.vuejs.org/vuex.png)



###### DVA数据流向图

![image](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)


#### 对比：
因为VUEX可以以一敌多，接下来将对以下三方面进行分析
- Redux vs VUEX
- React-Redux vs VUEX
- DVA vs VUEX

#### I

###### Redux
- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==dispatch==
- 状态更新提交参数：带type和payload的==Action==
- 状态更新计算：==reducer==
- 限制：reducer必须是纯函数，不支持异步
- 特性：支持中间件

###### VUEX
- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==commit==
- 状态更新提交参数：带type和payload的mutation==提交对象/参数==
- 状态更新计算：==mutation handler==
- 限制：mutation handler必须是非异步方法
- 特性：支持带缓存的getter，用于获取state经过某些计算后的值

###### Redux vs VUEX 对比分析
store和state是最基本的概念，VUEX没有做出改变。其实VUEX对整个框架思想并没有任何改变，只是某些内容变化了名称或者叫法，通过改名，以图在一些细节概念上有所区分。
- **VUEX弱化了dispatch的存在感**。VUEX认为状态变更的触发是一次“提交”而已，而调用方式则是框架提供一个提交的commit API接口。
- **VUEX取消了Redux中Action的概念**。不同于Redux认为状态变更必须是由一次"行为"触发，VUEX仅仅认为在任何时候触发状态变化只需要进行mutation即可。Redux的Action必须是一个对象，而VUEX认为只要传递必要的参数即可，形式不做要求。
- **VUEX也弱化了Redux中的reducer的概念**。reducer在计算机领域语义应该是"规约"，在这里意思应该是根据旧的state和Action的传入参数，"规约"出新的state。在VUEX中，对应的是mutation，即"转变"，只是根据入参对旧state进行"转变"而已。

总的来说，VUEX通过弱化概念，在任何东西都没做实质性削减的基础上，使得整套框架更易于理解了。

另外VUEX支持getter，运行中是带缓存的，算是对提升性能方面做了些优化工作，言外之意也是鼓励大家多使用getter。

#### II

###### React-Redux
- 状态注入组件：==<Provider/>组件结合connect方法==
- ==容器组件：通过connect关联了state的组件，并被传入dispatch接口==
- 展示组件：不与state或dispatch直接产生关系
- 特性：connect支持mapStatesToProps方法，用于自定义映射

###### VUEX
- 状态注入组件：==Vue.use(Vuex)将Vuex应用为全局的plugin，再将store对象传入根VUE实例==
- ==容器组件：没有这个概念==
- 展示组件：在组件中可以获取this.$store.state.*，也进行this.$store.commit()等等
- 特性：VUEX提供mapState，mapGetter，mapMutation等方法，用于生成store内部属性对组件内部属性的映射

###### React-Redux vs VUEX 对比分析
通过使用方式上的较大差异，也可以看出理念上的不同。
- **和组件结合方式的差异**。VUE通过VUEX全局插件的使用，结合将store传入根实例的过程，就可以使得store对象在运行时存在于任何vue组件中。而React-Redux则除了需要在较外层组件结构中使用<Provider/>以拿到store之外，还需要显式指定容器组件，即用connect包装一下该组件。这样看来我认为VUE是更推荐在使用了VUEX的框架中的每个组件内部都使用store，而React-Redux则提供了自由选择性。而VUEX即不需要使用外层组件，也不需要类似connect方式将组件做一次包装，我认为出发点应该是可能是为了避免啰嗦。
- **容器组件的差异**。React-Redux提倡容器组件和表现组件分离的最佳实践，而VUEX框架下不做区分，全都是表现（展示）组件。我觉得不分优劣，React-Redux的做法更清晰、更具有强制性和规范性，而VUEX的方式更加简化和易于理解。

总的来说，就是谁包谁，谁插谁的问题。Redux毕竟是独立于React的状态管理，它与React的结合则需要对React组件进行一下外包装。而VUEX就是为VUE定制，作为插件、以及使用插入的方式就可以生效，而且提供了很大的灵活性。

#### III

###### DVA
- 划分模块：提供了model的概念，一个model相当于是store的一个小块，DVA负责将这些小块整合成全局store而不需开发者关心。每个model提供配置namespace便于使用。
- 异步方法调用：==effect==。由于包装了Redux-Saga，DVA支持将配置的effect方法做为model的一部分。每个effect方法是一个Generator函数，将异步方法（Promise）调用同步化，框架提供迭代器，执行时串行执行。通过包装，开发者可以通过dispatch调用Action，以和调用reducer一样的方式调用effect方法。而effect内部提供API，用户获取参数、获取state、调用其他reducer等等。

###### VUEX
- 划分模块：允许将store分割成module，概念与DVA中的类似。与DVA一样，它也提供访问自身state和全局state的方法，也提供通过namespace/module名的方式供组件使用的办法，也提供动态注册、模块重用等。
- 异步方法调用：==Action==。Action类似于mutation，但是它内部支持异步调用。它无法直接更改state，但是可以使用context.commit()方式调用mutation。而对于开发者来说，不像DVA将effects和reducers的调用方式搞的相同，VUEX中的Action需要使用另一个API--dispatch接口来调用。它可以返回Promise对象，供调用者进行后续处理。
- 特性：支持双向绑定

###### DVA vs VUEX 对比分析
它们将store拆分成模块的出发点是相同的，这也是大型应用开发所必备的。并且模块化的思路都是一样的。但是异步方法调用方面有所不同：
- **DVA更倾向于支持同步化的代码写法与执行方式**。这样的好处是开发者使用effects和reducers时感觉是一样的。开发者可以适当规避使用Promise从而几乎不用接触异步概念，但是却需要接受Generator方法这种新事物。我认为学习成本并没有降低，可能好处就是最终代码比较简化，出错率较低吧。当然这对于框架本身来说会带来一定的复杂性。
- **VUEX倾向于将异步方法区分开**。Action就是异步方法，而mutation就是非异步方法。声明方式、调用方式、入参等等，都是有明显区别的。这样的好处是时刻在提醒开发者需要将异步方法加以区分注意，并且可以很常规地使用Promise，使用异步特性。

*VUEX还有个特性就是它的表单类组件的双向绑定。和VUEX结合之后，也是支持绑定到VUEX中的state上的。*

VUEX的异步方法的提交方式，注意是“dispatch一个Action”。这在概念上是和Redux中的状态更新提交是一致的。从VUEX数据流向图也能看出，VUEX也是建议只向外部暴露Action供调用。这样一来，VUEX在使用上更加接近Redux了。

总的来说，DVA和VUEX我认为肯定是有借鉴学习的成分在里面的，对异步的使用方面也没有孰优孰劣。我们也完全可以找到或者封装一个React-Redux中间件，以在React中使用类似的纯异步方法；也可以基于VUE与VUEX做开发，使得它可以支持Generator甚至async函数方式将异步代码写法同步化。


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
