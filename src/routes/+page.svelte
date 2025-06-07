<script lang="ts">
	import { todos, type Todo } from "../store"
	import { fly } from "svelte/transition";

	let todoItems: Todo[] = $state($todos)
	let input = $state("")
	
	function addTodo() {
		if (input === "") return
		const nextId = todoItems.length ? todoItems[todoItems.length - 1].id + 1 : 1
		const newTodo = {task: input, id: nextId}
		input = ""

		todoItems.push(newTodo)
		todos.update((t) => t = todoItems)
	}

	function deleteTodo(id:number) {
		todoItems = todoItems.filter(item => item.id != id)
		todos.update((t) => t = todoItems)
	}
</script>


<h1 class="font-medium text-4xl text-green-700 mb-4">Svelte todo</h1>
<p>Add a task</p>

<section class="flex gap-4 mb-4">
	<input
		bind:value={input}
		name="todo"
		class="w-full border border-slate-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-sky-500 outline-none" type="text">
	<button
		onclick={addTodo}
		class="whitespace-nowrap cursor-pointer py-2 px-4 text-white bg-sky-600 hover:bg-sky-500 rounded-md duration-150 focus:ring-2 focus:ring-sky-500 outline-none"
	>
		Add todo
	</button>
</section>

 <ul class="flex flex-col -mx-4">
	{#each todoItems as todo (todo.id)}
		<li out:fly={{x: 200, duration: 250}} class="flex justify-between items-center odd:bg-slate-50">
			<p class="px-4">{todo.task}</p>
			<button
				onclick={() => deleteTodo(todo.id)}
				class="p-4 bg-slate-100  hover:bg-red-400 cursor-pointer duration-150"
			>
				Delete
			</button>
		</li>
	{/each}
 </ul>
