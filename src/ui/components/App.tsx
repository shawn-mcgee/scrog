import { GraduationCap, CircleQuestionMark, Palette, Circle } from "lucide-react"




export default function App() {
  return (
    <div className="absolute w-dvw min-h-dvh flex flex-row p-2 gap-2">

      <div className="min-w-md self-stretch rounded-xl p-2 flex flex-col gap-2 bg-base-200">
        <span>Script</span>
        <textarea className="w-full flex-1 textarea"></textarea>
        <div className="flex flex-row gap-2 justify-end">
          <button className="btn flex-1 btn-primary">Run</button>
          <button className="btn flex-1">Reset</button>
        </div>
      </div>

      <div className="flex-1 rounded-xl p-2 flex flex-col items-center justify-center">

      </div>

      <div className="tabs tabs-box min-w-md justify-center">

        <label className="tab">
          <input type="radio" name="control-panel" defaultChecked/>
          <GraduationCap className="mr-2" />
          Tutorial
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">Tutorial Content</div>

        <label className="tab">
          <input type="radio" name="control-panel" />
          <CircleQuestionMark className="mr-2" />
          Inspector
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">Inspector Content</div>

        <label className="tab">
          <input type="radio" name="control-panel" />
          <Palette className="mr-2" />
          Palette
        </label>
        <div className="tab-content bg-base-100 border-base-300 p-6">Palette Content</div>
      </div>

    </div>
  )
}