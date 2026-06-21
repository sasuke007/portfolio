import type { Metadata } from "next";
import Link from "next/link";
import { Playground } from "@/components/playground/Playground";
import { postMeta } from "./meta";

export const metadata: Metadata = {
  title: `${postMeta.title} — Rohit Pandit`,
  description: postMeta.summary,
};

export default function IsolationLevelsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog/database"
        className="label-micro opacity-60 hover:opacity-100"
      >
        ← Database
      </Link>

      <header className="mt-6">
        <h1 className="font-display text-5xl leading-tight md:text-6xl">
          {postMeta.title}
        </h1>
        <div className="label-micro mt-4 flex gap-4 opacity-60">
          <time dateTime={postMeta.publishedAt}>{postMeta.publishedAt}</time>
          <span>{postMeta.readingMinutes} min read</span>
        </div>
        <p className="body-editorial mt-6 italic">{postMeta.summary}</p>
      </header>

      <div className="mt-12">
        <div className="flex flex-col gap-8 body-editorial text-base leading-relaxed">
          <P>
            Every relational database promises four letters — <Code>A</Code>,{" "}
            <Code>C</Code>, <Code>I</Code>, <Code>D</Code>. The <Em>I</Em> is the
            one with the loosest fine print. &quot;Isolation&quot; isn&apos;t a
            single guarantee; it&apos;s a dial. Crank it up and concurrent
            transactions stop interfering with each other — but you pay in
            retries, locks, and aborted work. Crank it down and you get
            throughput, plus a category of bugs that only appear under load.
          </P>

          <P>
            The ANSI SQL standard names four levels —{" "}
            <Code>READ UNCOMMITTED</Code>, <Code>READ COMMITTED</Code>,{" "}
            <Code>REPEATABLE READ</Code>, <Code>SERIALIZABLE</Code> — and four
            phenomena they may or may not prevent: dirty reads, non-repeatable
            reads, phantom reads, and (later additions) lost updates and write
            skew. The names suggest a tidy ladder. The reality, especially in
            Postgres with its MVCC implementation, is funnier than that.
          </P>

          <P>
            Rather than write 3000 words of taxonomy I built a Postgres
            playground. The button below this paragraph fires real transactions
            at a real database that lives somewhere in us-east-1. Pick a
            scenario, pick an isolation level, watch what happens to each side
            of the concurrent dance. There&apos;s also a free-form panel where
            you can write whatever SQL you want (within reason — see the&nbsp;
            <Em>about the sandbox</Em> note at the end).
          </P>

          <Playground />

          <H2>The cast of phenomena</H2>

          <P>
            <strong>Dirty read.</strong> T1 writes a row, T2 reads it,{" "}
            <em>then T1 rolls back</em>. T2 has seen a value that, officially,
            never existed. The standard says this is possible at{" "}
            <Code>READ UNCOMMITTED</Code> and prevented elsewhere. Postgres cuts
            the knot: there is no real <Code>READ UNCOMMITTED</Code>; asking
            for it silently gets you <Code>READ COMMITTED</Code>. MVCC&apos;s
            row visibility rules don&apos;t expose uncommitted versions to
            anyone. So the &quot;weakest&quot; PG level is already stronger
            than the standard demands.
          </P>

          <P>
            <strong>Non-repeatable read.</strong> T1 reads a row, T2 updates
            and commits, T1 reads the same row again. Different value.
            Application code that assumes its in-progress transaction sees a
            stable world breaks here. Prevented at <Code>REPEATABLE READ</Code>{" "}
            and up — and in Postgres, that&apos;s the cheaper-than-you&apos;d-think
            guarantee, because MVCC just makes T1 keep reading from its
            original snapshot.
          </P>

          <P>
            <strong>Phantom read.</strong> T1 counts rows matching a predicate,
            T2 inserts a new matching row and commits, T1 counts again. The SQL
            standard claims only <Code>SERIALIZABLE</Code> prevents this;
            Postgres&apos;s <Code>REPEATABLE READ</Code> already does, because
            snapshots are stronger than the standard mandates. This is one of
            the more pleasant surprises in PG&apos;s isolation model.
          </P>

          <P>
            <strong>Lost update.</strong> Two transactions both read{" "}
            <Code>qty = 10</Code>, both decide to write <Code>qty = 9</Code>.
            At <Code>READ COMMITTED</Code>, the second writer silently
            overwrites the first; what should have been <Code>qty = 8</Code>{" "}
            ends up as <Code>qty = 9</Code>. At <Code>REPEATABLE READ</Code>{" "}
            Postgres detects the conflict at commit time and aborts the second
            writer with SQLSTATE <Code>40001</Code>. Your application is
            expected to catch this and retry. <em>Not</em> catching it is the
            most common production bug in this whole list.
          </P>

          <P>
            <strong>Write skew.</strong> The headline argument for{" "}
            <Code>SERIALIZABLE</Code>. Two transactions each maintain an
            invariant (&quot;at least one doctor is on call&quot;) individually,
            but their concurrent commits jointly violate it. Snapshot isolation
            can&apos;t see the conflict because neither transaction wrote to a
            row the other read. Postgres&apos;s SSI (Serializable Snapshot
            Isolation) tracks predicate-level read/write dependencies and
            aborts one transaction with <Code>40001</Code> when a cycle is
            detected. The &quot;cost&quot; of <Code>SERIALIZABLE</Code> is
            mostly: more retries.
          </P>

          <H2>So which one should I use?</H2>

          <P>
            <Code>READ COMMITTED</Code> is the default in Postgres for a
            reason: it covers the obvious sins (no dirty reads) at almost no
            cost. Most OLTP code lives here happily.{" "}
            <Code>REPEATABLE READ</Code> earns its keep when you have
            multi-statement reads that need a consistent view of the world
            (think reports inside a transaction). <Code>SERIALIZABLE</Code>{" "}
            earns its keep when an invariant spans multiple rows or tables and
            you don&apos;t want to hand-roll application-level locking.
          </P>

          <P>
            The cost calculus isn&apos;t uniform. <Code>SERIALIZABLE</Code>{" "}
            means your app has to handle <Code>40001</Code> retries gracefully;
            write that retry wrapper once and you&apos;re mostly free. The hard
            part is realizing you needed it before a production incident
            teaches you.
          </P>

          <H2>About the sandbox</H2>

          <P>
            The playground above runs against a small Neon Postgres database.
            Each visitor gets a private schema (
            <Code>playground_&lt;sessionId&gt;</Code>) that&apos;s seeded with
            the scenario tables (<Code>accounts</Code>, <Code>inventory</Code>,{" "}
            <Code>bookings</Code>, <Code>doctors</Code>) and dropped 15 minutes
            after your last interaction. Free-form SQL goes through a parser
            allowlist before it touches Postgres: only{" "}
            <Code>SELECT/INSERT/UPDATE/DELETE</Code>, single statements, no
            DDL, no <Code>COPY</Code>, no <Code>SET</Code>, no schema-qualified
            references to anything outside your sandbox, no filesystem or
            backend-management functions. The connection role only has DML
            privileges anyway, so even if a regex sneaks past the parser, your
            worst case is a confused 42501.
          </P>

          <P>
            If you find something the parser misses, please open an issue.
            That&apos;s a useful kind of bug.
          </P>
        </div>
      </div>
    </article>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-3xl mt-6">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[var(--color-text)]">{children}</p>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <em className="font-display italic">{children}</em>;
}
